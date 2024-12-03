import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "UserKind",
  name: "用户类型",
  valueType: "string",
  level: "app",
  entries: [
    { name: "内部用户", value: "internal" },
    { name: "合作方用户", value: "partner", color: "purple" },
  ],
} as RapidDataDictionary;
