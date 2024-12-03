import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "code",
    },
    {
      type: "auto",
      code: "name",
    },
    {
      type: "auto",
      code: "categories",
    },
  ],
};

const page: RapidPage = {
  code: "tower_supplier_list",
  name: "供应商管理",
  title: "供应商管理",
  permissionCheck: { any: ["basePartner.manage"] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "BasePartner",
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
          placeholder: "搜索名称、编码",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code", "name"],
        },
      ],
      orderBy: [
        {
          field: "name",
        },
      ],
      pageSize: 20,
      columns: [
        {
          type: "link",
          code: "code",
          width: "100px",
          fixed: "left",
        },
        {
          type: "auto",
          code: "name",
          fixed: "left",
        },
        {
          type: "auto",
          code: "categories",
          rendererProps: {
            item: {
              $type: "rapidObjectRenderer",
              format: "{{name}}",
            },
          },
        },
        {
          type: "auto",
          code: "createdAt",
          width: "150px",
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
          entityCode: "BasePartner",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;
