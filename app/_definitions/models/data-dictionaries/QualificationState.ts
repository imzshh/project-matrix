import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "QualificationState",
  name: "质量状态",
  valueType: "string",
  level: "app",
  entries: [
    { name: "免检", value: "inspectFree" },
    { name: "未检验", value: "uninspected" },
    { name: "合格", value: "qualified", color: "green" },
    { name: "不合格", value: "unqualified", color: "red" },
  ],
} as RapidDataDictionary;
