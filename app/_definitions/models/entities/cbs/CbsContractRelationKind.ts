import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "CbsContractRelationKind",
  name: "合同关联关系",
  fields: [
    {
      code: "code",
      name: "编码",
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
      code: "orderNum",
      name: "排序号",
      type: "integer",
      required: true,
    },
    {
      code: "opposite",
      name: "反向关系",
      type: "relation",
      targetSingularCode: "cbs_contract_relation_kind",
      targetIdColumnName: "opposite_id",
    },
  ],
};

export default entity;
