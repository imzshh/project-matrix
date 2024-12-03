import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "CbsOrder",
  name: "订单",
  fields: [
    {
      code: "kind",
      name: "类型",
      type: "option",
      required: true,
      dataDictionary: "CbsOrderKind",
    },
    {
      code: "code",
      name: "编号",
      type: "text",
      required: false,
    },
    {
      code: "name",
      name: "名称",
      type: "text",
      required: true,
    },
    {
      code: "description",
      name: "描述",
      type: "text",
    },
    {
      code: "requiredDeliveryDate",
      name: "要求交货日期",
      type: "date",
    },
    {
      code: "partner",
      name: "合作伙伴",
      type: "relation",
      targetSingularCode: "base_partner",
      targetIdColumnName: "partner_id",
    },
    {
      code: "projects",
      name: "相关项目",
      type: "relation[]",
      targetSingularCode: "pm_project",
      linkTableName: "cbs_contracts_projects",
      targetIdColumnName: "project_id",
      selfIdColumnName: "order_id",
    },
    {
      code: "contracts",
      name: "相关合同",
      type: "relation[]",
      targetSingularCode: "cbs_contract",
      linkTableName: "cbs_contracts_orders",
      targetIdColumnName: "contract_id",
      selfIdColumnName: "order_id",
    },
    {
      code: "mrp",
      name: "物料需求计划",
      type: "relation",
      targetSingularCode: "mom_manufacturing_resource_plan",
      targetIdColumnName: "mrp_id",
    },
    {
      code: "items",
      name: "订单项",
      type: "relation[]",
      targetSingularCode: "cbs_order_item",
      selfIdColumnName: "order_id",
    },
    {
      code: "totalAmount",
      name: "订单金额",
      description: "订单含税金额",
      type: "double",
      required: true,
      defaultValue: "0",
    },
    {
      code: "taxFee",
      name: "税费",
      type: "double",
      required: true,
      defaultValue: "0",
    },
    {
      code: "transactions",
      name: "转账记录",
      type: "relation[]",
      targetSingularCode: "fin_transaction",
      linkTableName: "cbs_orders_transactions",
      targetIdColumnName: "transaction_id",
      selfIdColumnName: "order_id",
    },
    {
      code: "state",
      name: "状态",
      required: true,
      type: "option",
      dataDictionary: "CbsOrderState",
    },
    {
      code: "purchaseOrderCategories",
      name: "采购订单分类",
      type: "relation[]",
      targetSingularCode: "cbs_purchase_order_category",
      linkTableName: "cbs_order_purchase_category_link",
      targetIdColumnName: "category_id",
      selfIdColumnName: "order_id",
    },
  ],
};

export default entity;
