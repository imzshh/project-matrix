import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      code: "materialCategory",
      type: "auto",
    },
    // {
    //   code: "warehouse",
    //   type: "auto",
    // },
    {
      code: "businessType",
      type: "auto",
    },
    {
      code: "strategy",
      type: "auto",
    },
    // {
    //   code: "priority",
    //   type: "auto",
    // },
    {
      code: "qualifiedFilter",
      type: "auto",
    },
    {
      code: "validityFilter",
      type: "auto",
    },
    {
      code: "isAOD",
      type: "auto",
    },
    {
      code: "enabled",
      type: "auto",
      defaultValue: true,
    },
  ],
};

const page: RapidPage = {
  code: "mom_warehouse_strategy_list",
  name: "仓库策略列表",
  title: "仓库策略列表",
  // permissionCheck: {any: ["warehouseStrategy.manage"]},
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "MomWarehouseStrategy",
      viewMode: "table",
      selectionMode: "none",
      orderBy: [
        {
          field: "id",
        },
      ],
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
          $permissionCheck: "warehouseStrategy.manage",
        },
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "搜索名称、描述",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["name", "description"],
        },
      ],
      columns: [
        {
          code: "materialCategory",
          width: "100px",
          type: "auto",
          rendererProps: {
            format: "{{name}}",
          },
        },
        // {
        //   code: "warehouse",
        //   width: "100px",
        //   type: "auto",
        //   rendererProps: {
        //     format: "{{name}}",
        //   },
        // },
        {
          code: "businessType",
          width: "100px",
          type: "auto",
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          code: "strategy",
          width: "100px",
          type: "auto",
        },
        // {
        //   code: "priority",
        //   width: "100px",
        //   type: "auto",
        // },
        {
          code: "qualifiedFilter",
          width: "100px",
          type: "auto",
        },
        {
          code: "validityFilter",
          width: "100px",
          type: "auto",
        },
        {
          code: "isAOD",
          width: "100px",
          type: "auto",
        },
        {
          code: "enabled",
          width: "100px",
          type: "auto",
        },
      ],
      actions: [
        {
          $type: "sonicRecordActionEditEntity",
          code: "edit",
          actionType: "edit",
          actionText: "修改",
          $permissionCheck: "warehouseStrategy.manage",
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: "delete",
          actionType: "delete",
          actionText: "删除",
          dataSourceCode: "list",
          entityCode: "MomWarehouseStrategy",
          $permissionCheck: "warehouseStrategy.manage",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;
