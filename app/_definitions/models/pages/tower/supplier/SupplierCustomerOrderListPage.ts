import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig, SonicEntityListRockConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "kind",
    },
    {
      type: "auto",
      code: "partner",
      label: "供应商",
      formControlProps: {
        dropdownMatchSelectWidth: 300,
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ["name", "code"],
        columns: [
          { code: "code", title: "编码", width: 120 },
          { code: "name", title: "名称", width: 120 },
        ],
      },
    },
    {
      type: "auto",
      code: "purchaseOrderCategories",
      formControlProps: {
        dropdownMatchSelectWidth: 300,
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ["name", "code"],
        columns: [
          { code: "code", title: "编码", width: 120 },
          { code: "name", title: "名称", width: 120 },
        ],
      },
    },
    {
      type: "auto",
      code: "projects",
      formControlProps: {
        dropdownMatchSelectWidth: 300,
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ["name", "code"],
        columns: [
          { code: "code", title: "编号", width: 120 },
          { code: "name", title: "名称", width: 120 },
        ],
      },
    },
    {
      type: "auto",
      code: "contracts",
      formControlProps: {
        dropdownMatchSelectWidth: 300,
        listTextFormat: "{{code}} {{name}}",
        listFilterFields: ["name", "code"],
        columns: [
          { code: "code", title: "编号", width: 120 },
          { code: "name", title: "名称", width: 120 },
        ],
      },
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
      code: "state",
      formControlProps: {
        listSearchable: true,
        listTextFormat: "{{name}} {{value}}",
        listFilterFields: ["label"],
      },
    },
  ],
};

const page: RapidPage = {
  code: "supplier_customer_order_list",
  name: "我的订单",
  title: "我的订单",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "CbsOrder",
      viewMode: "table",
      selectionMode: "none",
      listActions: [],
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
      fixedFilters: [
        {
          operator: "eq",
          field: "kind",
          value: "purchase",
        },
      ],
      pageSize: 20,
      columns: [
        {
          type: "link",
          code: "code",
          fixed: "left",
          width: "200px",
          rendererProps: {
            url: "/pages/supplier_customer_order_details?id={{id}}",
          },
        },
        {
          type: "link",
          code: "name",
          fixed: "left",
          rendererProps: {
            url: "/pages/supplier_customer_order_details?id={{id}}",
          },
        },
        {
          type: "auto",
          code: "totalAmount",
          width: "120px",
          align: "right",
          rendererType: "rapidCurrencyRenderer",
        },
        {
          type: "auto",
          code: "state",
          width: "100px",
        },
        {
          type: "auto",
          code: "createdAt",
          width: "150px",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    } satisfies SonicEntityListRockConfig,
  ],
};

export default page;
