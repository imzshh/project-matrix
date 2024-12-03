import type { RapidPage } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "supplier_dashboard",
  name: "工作台",
  title: "工作台",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "text",
      text: "工作台",
    },
  ],
};

export default page;
