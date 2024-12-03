import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "CbsContractRelation",
  name: "合同关联",
  fields: [
    {
      code: "main",
      name: "主体合同",
      type: "relation",
      targetSingularCode: "cbs_contract",
      targetIdColumnName: "main_id",
    },
    {
      code: "target",
      name: "被关联合同",
      type: "relation",
      targetSingularCode: "cbs_contract",
      targetIdColumnName: "target_id",
    },
    {
      code: "kind",
      name: "关系",
      type: "relation",
      targetSingularCode: "cbs_contract_relation_kind",
      targetIdColumnName: "kind_id",
    },
  ],
};

export default entity;
