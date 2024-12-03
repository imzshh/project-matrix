import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "treeSelect",
      code: "parent",
      formControlProps: {
        listDataSourceCode: "categories",
        listParentField: "parent.id",
      },
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
      code: "orderNum",
    },
  ],
};

const page: RapidPage = {
  code: "base_purchase_order_category_list",
  name: "采购订单分类管理",
  title: "采购订单分类管理",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "CbsPurchaseOrderCategory",
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
          placeholder: "搜索名称、编号",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code", "name"],
        },
      ],
      orderBy: [
        {
          field: "orderNum",
        },
      ],
      convertListToTree: true,
      listParentField: "parent.id",
      pageSize: -1,
      columns: [
        {
          type: "auto",
          code: "name",
          fixed: "left",
          width: "200px",
        },
        {
          type: "auto",
          code: "description",
          width: "300px",
        },
        {
          type: "auto",
          code: "orderNum",
          width: "100px",
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
          entityCode: "CbsPurchaseOrderCategory",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
      stores: [
        {
          type: "entityStore",
          name: "categories",
          entityCode: "CbsPurchaseOrderCategory",
          properties: ["id", "code", "name", "parent", "orderNum", "createdAt"],
          filters: [],
          orderBy: [
            {
              field: "orderNum",
            },
          ],
        },
      ],
    },
  ],
};

export default page;
