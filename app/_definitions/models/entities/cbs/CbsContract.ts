import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "CbsContract",
  name: "合同",
  fields: [
    {
      code: "kind",
      name: "类型",
      type: "option",
      dataDictionary: "CbsContractKind",
      required: false,
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
      code: "project",
      name: "所属项目",
      type: "relation",
      targetSingularCode: "pm_project",
      targetIdColumnName: "project_id",
    },
    {
      code: "salesman",
      name: "销售",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "salesman_id",
    },
    {
      code: "orders",
      name: "相关订单",
      type: "relation[]",
      targetSingularCode: "cbs_order",
      linkTableName: "cbs_contracts_orders",
      targetIdColumnName: "order_id",
      selfIdColumnName: "contract_id",
    },
    {
      code: "totalAmount",
      name: "合同金额",
      type: "double",
      required: true,
    },
    {
      code: "signingDate",
      name: "签订日期",
      type: "date",
    },
    {
      code: "state",
      name: "状态",
      required: true,
      type: "option",
      dataDictionary: "CbsContractState",
    },
  ],
};

export default entity;
