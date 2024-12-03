import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "BaseFormField",
  name: "表单字段",
  fields: [
    {
      code: "code",
      name: "编码",
      type: "text",
      required: true,
    },
    {
      code: "name",
      name: "名称",
      type: "text",
      required: true,
    },
    {
      code: "source",
      name: "来源",
      type: "text",
    },
    {
      code: "externalId",
      name: "外部id",
      type: "text",
    },
    {
      code: "externalData",
      name: "外部数据",
      type: "json",
    },
    {
      code: "fieldType",
      name: "字段类型",
      type: "option",
      dataDictionary: "FormFieldType",
      required: true,
    },
    {
      code: "state",
      name: "状态",
      type: "option",
      dataDictionary: "EnabledDisabledState",
      required: false,
    },
    {
      code: "description",
      name: "备注",
      type: "text",
    },
  ],
};

export default entity;
