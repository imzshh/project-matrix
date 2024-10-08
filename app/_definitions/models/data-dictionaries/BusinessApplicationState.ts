import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "BusinessApplicationState",
  name: "业务申请状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "草稿", value: "draft" },
    { name: "审批中", value: "approving", color: "orange" },
    { name: "已批准", value: "approved", color: "green" },
    { name: "已拒绝", value: "rejected", color: "red" },
    { name: "已撤回", value: "canceled", color: "gray" },
  ],
} as RapidDataDictionary;
