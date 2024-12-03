import type { RapidDataDictionary } from "@ruiapp/rapid-extension";

export default {
  code: "BasePartnerType",
  name: "合作伙伴类型",
  valueType: "string",
  entries: [
    { name: "供应商", value: "supplier" },
    { name: "客户", value: "customer" },
  ],
} as RapidDataDictionary;
