import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig, SonicEntityDetailsRockConfig, SonicEntityListRockConfig } from "@ruiapp/rapid-extension";

const productionReportItemFormConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "orderItem",
    },
    {
      type: "auto",
      code: "quantity",
    },
    {
      type: "auto",
      code: "unit",
    },
  ],
};

const deliveryReportItemFormConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "orderItem",
    },
    {
      type: "auto",
      code: "quantity",
    },
    {
      type: "auto",
      code: "unit",
    },
  ],
};

const page: RapidPage = {
  code: "supplier_customer_order_details",
  //@ts-ignore
  parentCode: "supplier_customer_order_list",
  name: "订单详情",
  title: "订单详情",
  permissionCheck: { any: [] },
  view: [
    {
      $id: "entityDetails",
      $type: "sonicEntityDetails",
      entityCode: "CbsOrder",
      titlePropertyCode: "code",
      subTitlePropertyCode: "name",
      statePropertyCode: "state",
      column: 1,
      descriptionItems: [
        {
          code: "description",
          labelStyle: { display: "none" },
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      },
    } satisfies SonicEntityDetailsRockConfig,
    {
      $id: "towerPurchaseOrderProgressBox",
      $type: "box",
      style: {
        padding: "20px 10px 40px",
      },
      children: [
        {
          $id: "towerPurchaseOrderProgress",
          $type: "towerPurchaseOrderProgress",
        },
      ],
    },

    {
      $type: "antdTabs",
      items: [
        {
          key: "items",
          label: "订单明细",
          children: [
            {
              $id: "projectLogList",
              $type: "sonicEntityList",
              entityCode: "CbsOrderItem",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
                {
                  operator: "eq",
                  field: "order_id",
                  value: "",
                },
              ],
              listActions: [],
              pageSize: -1,
              orderBy: [
                {
                  field: "orderNum",
                },
              ],
              columns: [
                {
                  type: "auto",
                  code: "orderNum",
                  width: "60px",
                },
                {
                  type: "auto",
                  code: "name",
                  width: "200px",
                },
                {
                  type: "auto",
                  code: "description",
                },
                {
                  type: "auto",
                  code: "quantity",
                  width: "100px",
                  align: "right",
                },
                {
                  type: "auto",
                  code: "unit",
                  width: "50px",
                  rendererProps: {
                    format: "{{name}}",
                  },
                },
                {
                  type: "auto",
                  code: "price",
                  width: "120px",
                  align: "right",
                  rendererType: "rapidCurrencyRenderer",
                },
                {
                  type: "auto",
                  code: "taxRate",
                  width: "60px",
                  align: "right",
                  rendererType: "rapidPercentRenderer",
                },
                {
                  key: "price-quantity-taxRate",
                  type: "auto",
                  code: "id",
                  title: "税费",
                  width: "120px",
                  align: "right",
                  rendererType: "rapidCurrencyRenderer",
                  rendererProps: {
                    $exps: {
                      value: "$slot.record.price * $slot.record.quantity * $slot.record.taxRate",
                    },
                  },
                },
                {
                  key: "price-quantity",
                  type: "auto",
                  code: "id",
                  fieldName: "id",
                  title: "金额",
                  width: "120px",
                  align: "right",
                  rendererType: "rapidCurrencyRenderer",
                  rendererProps: {
                    $exps: {
                      value: "$slot.record.price * $slot.record.quantity",
                    },
                  },
                },
              ],
              footer: [
                {
                  $type: "antdAlert",
                  style: {
                    textAlign: "right",
                  },
                  $exps: {
                    _hidden: "!$scope.stores.list?.data",
                    message:
                      "$scope.stores.list ? '总金额：' + Intl.NumberFormat('Zh-cn').format(_.sumBy($scope.stores.list.data?.list, function (item) {return item.price * item.quantity})) : ''",
                  },
                },
              ],
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
              },
            },
          ],
        },
        {
          key: "productionReports",
          label: "生产进度",
          children: [
            {
              $id: "productionReportItemList",
              $type: "sonicEntityList",
              entityCode: "TowerOrderProductionReportItem",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
                {
                  operator: "eq",
                  field: "order_id",
                  value: "",
                },
              ],
              listActions: [
                {
                  $type: "sonicToolbarNewEntityButton",
                  text: "新建",
                  icon: "PlusOutlined",
                  actionStyle: "primary",
                },
              ],
              pageSize: -1,
              orderBy: [
                {
                  field: "id",
                  desc: true,
                },
              ],
              columns: [
                {
                  type: "auto",
                  code: "reportTime",
                  width: "160px",
                },
                {
                  type: "auto",
                  code: "orderItem",
                },
                {
                  type: "auto",
                  code: "quantity",
                  width: "100px",
                  align: "right",
                },
                {
                  type: "auto",
                  code: "unit",
                  width: "50px",
                  rendererProps: {
                    format: "{{name}}",
                  },
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
                  entityCode: "TowerOrderProductionReportItem",
                },
              ],
              newForm: cloneDeep(productionReportItemFormConfig),
              editForm: cloneDeep(productionReportItemFormConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.order_id": "$rui.parseQuery().id",
              },
            } satisfies SonicEntityListRockConfig,
          ],
        },
        {
          key: "qualityReports",
          label: "质检报告",
          children: [],
        },

        {
          key: "deliveryReports",
          label: "发货记录",
          children: [
            {
              $id: "deliveryReportItemList",
              $type: "sonicEntityList",
              entityCode: "TowerOrderDeliveryReportItem",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
                {
                  operator: "eq",
                  field: "order_id",
                  value: "",
                },
              ],
              listActions: [
                {
                  $type: "sonicToolbarNewEntityButton",
                  text: "新建",
                  icon: "PlusOutlined",
                  actionStyle: "primary",
                },
              ],
              pageSize: -1,
              orderBy: [
                {
                  field: "id",
                  desc: true,
                },
              ],
              columns: [
                {
                  type: "auto",
                  code: "reportTime",
                  width: "160px",
                },
                {
                  type: "auto",
                  code: "orderItem",
                },
                {
                  type: "auto",
                  code: "quantity",
                  width: "100px",
                  align: "right",
                },
                {
                  type: "auto",
                  code: "unit",
                  width: "50px",
                  rendererProps: {
                    format: "{{name}}",
                  },
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
                  entityCode: "TowerOrderDeliveryReportItem",
                },
              ],
              newForm: cloneDeep(deliveryReportItemFormConfig),
              editForm: cloneDeep(deliveryReportItemFormConfig),
              $exps: {
                "fixedFilters[0].value": "$rui.parseQuery().id",
                "newForm.fixedFields.order_id": "$rui.parseQuery().id",
              },
            } satisfies SonicEntityListRockConfig,
          ],
        },
        {
          key: "transactions",
          label: "付款记录",
          children: [
            {
              $id: "transactionList",
              $type: "sonicEntityList",
              entityCode: "FinTransaction",
              viewMode: "table",
              selectionMode: "none",
              fixedFilters: [
                {
                  field: "order",
                  operator: "exists",
                  filters: [
                    {
                      field: "id",
                      operator: "eq",
                      value: "",
                    },
                  ],
                },
              ],
              orderBy: [
                {
                  field: "transferedAt",
                  desc: true,
                },
              ],
              pageSize: -1,
              columns: [
                {
                  type: "auto",
                  code: "code",
                  width: "100px",
                  fixed: "left",
                },
                {
                  type: "auto",
                  code: "transferedAt",
                  width: "150px",
                  fixed: "left",
                },
                {
                  type: "auto",
                  code: "account",
                  width: "150px",
                  fieldName: "account.name",
                },
                {
                  type: "auto",
                  code: "type",
                  width: "80px",
                },
                {
                  type: "auto",
                  code: "amount",
                  width: "120px",
                  align: "right",
                  rendererType: "rapidCurrencyRenderer",
                },
                {
                  type: "auto",
                  code: "description",
                },
                {
                  type: "auto",
                  code: "contract",
                  rendererType: "rapidLinkRenderer",
                  rendererProps: {
                    text: "{{code}} {{name}}",
                    url: "/pages/cbs_contract_details?id={{id}}",
                  },
                },
                {
                  type: "auto",
                  code: "state",
                  width: "100px",
                },
              ],
              $exps: {
                "fixedFilters[0].filters[0].value": "$rui.parseQuery().id",
              },
            },
          ],
        },
      ],
    },
  ],
};

export default page;
