import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "TowerOrderProductionReportItem",
  name: "生产进度汇报",
  fields: [
    {
      code: "order",
      name: "订单",
      type: "relation",
      targetSingularCode: "cbs_order",
      targetIdColumnName: "order_id",
      required: true,
    },
    {
      code: "orderItem",
      name: "订单项",
      type: "relation",
      targetSingularCode: "cbs_order_item",
      targetIdColumnName: "order_item_id",
      required: true,
    },
    {
      code: "quantity",
      name: "数量",
      type: "double",
      required: true,
    },
    {
      code: "unit",
      name: "单位",
      type: "relation",
      targetSingularCode: "base_unit",
      targetIdColumnName: "unit_id",
    },
    {
      code: "reportTime",
      name: "汇报时间",
      type: "datetime",
      required: true,
      defaultValue: "now()",
    },
  ],
};

export default entity;
