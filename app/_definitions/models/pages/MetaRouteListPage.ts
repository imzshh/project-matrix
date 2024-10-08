import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "namespace",
    },
    {
      type: "auto",
      code: "code",
    },
    {
      type: "auto",
      code: "name",
    },
    {
      type: "textarea",
      code: "description",
    },
    {
      type: "auto",
      code: "type",
    },
    {
      type: "auto",
      code: "method",
    },
    {
      type: "auto",
      code: "endpoint",
    },
    {
      type: "auto",
      code: "actions",
    },
  ],
};

const page: RapidPage = {
  code: "meta_route_list",
  name: "路由列表",
  title: "路由管理",
  permissionCheck: { any: ["dev.manage"] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "Route",
      viewMode: "table",
      selectionMode: "none",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
        },
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "搜索名称、编号、Endpoint",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code", "name", "endpoint"],
        },
      ],
      columns: [
        {
          type: "auto",
          code: "namespace",
          title: "Ns.",
          width: "100px",
          fixed: "left",
        },
        {
          type: "auto",
          code: "code",
          width: "200px",
          fixed: "left",
        },
        {
          type: "auto",
          code: "name",
          width: "200px",
        },
        {
          type: "auto",
          code: "type",
          width: "100px",
        },
        {
          type: "auto",
          code: "method",
          width: "100px",
        },
        {
          type: "auto",
          code: "endpoint",
          width: "300px",
        },
        {
          type: "auto",
          code: "description",
        },
      ],
      actions: [
        {
          $type: "sonicRecordActionEditEntity",
          code: "edit",
          actionType: "edit",
          actionText: "修改",
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: "delete",
          actionType: "delete",
          actionText: "删除",
          dataSourceCode: "list",
          entityCode: "Route",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      searchForm: {
        entityCode: "Route",
        items: [
          {
            type: "auto",
            code: "code",
            filterMode: "contains",
          },
          {
            type: "auto",
            code: "name",
            filterMode: "contains",
          },
          {
            type: "auto",
            code: "endpoint",
            filterMode: "contains",
          },
        ],
      },
    },
  ],
};

export default page;
