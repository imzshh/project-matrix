import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Layout, ConfigProvider } from "antd";

import antdStyles from "antd/dist/antd.css";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import AppLeftNav from "~/components/AppLeftNav";
import rapidService from "~/rapidService";

import indexStyles from "~/styles/index.css";
import customizeStyles from "~/styles/customize.css";
import { filter } from "lodash";
import { isAccessAllowed } from "~/utils/access-control-utility";

import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

type ViewModel = {
  systemSettings: Record<string, any>;
  navItems: any;
};

export function links() {
  return [antdStyles, indexStyles, customizeStyles].map((styles) => {
    return { rel: "stylesheet", href: styles };
  });
}

export const loader: LoaderFunction = async ({ request }) => {
  const systemSettings = (
    await rapidService.get(`svc/systemSettingValues?groupCode=public`, {
      headers: {
        Cookie: request.headers.get("Cookie"),
      },
    })
  ).data;

  const findAppNavItemOption = {
    properties: ["id", "code", "name", "icon", "pageCode", "parent", "config"],
    filters: [
      {
        operator: "exists",
        field: "client",
        filters: [
          {
            operator: "eq",
            field: "code",
            value: "web",
          },
        ],
      },
      {
        field: "state",
        operator: "eq",
        value: "enabled",
      },
    ],
    orderBy: [
      {
        field: "order_num",
      },
    ],
  };
  let navItems = (await rapidService.post("app/app_nav_items/operations/find", findAppNavItemOption)).data.list;

  const myAllowedActions = (
    await rapidService.get(`app/listMyAllowedSysActions`, {
      headers: {
        Cookie: request.headers.get("Cookie"),
      },
    })
  ).data;

  navItems = filter(navItems, (navItem) => {
    const permissionCheckPolicy = navItem.config?.permissionCheck;
    if (!permissionCheckPolicy) {
      return true;
    }

    return isAccessAllowed(permissionCheckPolicy, myAllowedActions || []);
  });

  return {
    systemSettings,
    navItems,
  };
};

export default function Index() {
  const viewModel = useLoaderData<ViewModel>();

  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ minHeight: "100vh" }} hasSider>
        <Sider className="rui-player-left-sider">
          <h1 className="branch-title">{viewModel.systemSettings.systemName || "Link Tower"}</h1>
          <AppLeftNav navItems={viewModel.navItems} />
        </Sider>
        <Layout>
          <Content className="rui-player-main-content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
