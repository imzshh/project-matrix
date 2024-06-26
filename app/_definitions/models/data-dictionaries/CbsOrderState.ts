import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "CbsOrderState",
  name: "订单状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "待签约", value: "unsigned" },
    { name: "履约中", value: "fulfilling", color: "blue" },
    { name: "已完成", value: "fulfilled", color: "green" },
    { name: "暂停", value: "suspended", color: "orange" },
    { name: "已终止", value: "cancelled", color: "red" },
  ],
} as RapidDataDictionary;
