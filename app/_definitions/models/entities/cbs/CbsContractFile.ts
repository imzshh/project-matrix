import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "CbsContractFile",
  name: "合同文件",
  fields: [
    {
      code: "code",
      name: "文件编号",
      type: "text",
    },
    {
      code: "name",
      name: "文件名",
      type: "text",
      required: true,
    },
    {
      code: "size",
      name: "文件大小",
      type: "long",
      required: true,
    },
    {
      code: "description",
      name: "备注",
      type: "text",
    },
    {
      code: "contract",
      name: "合同",
      type: "relation",
      targetSingularCode: "cbs_contract",
      targetIdColumnName: "contract_id",
    },
    {
      code: "storageObject",
      name: "存储对象",
      type: "relation",
      targetSingularCode: "ecm_storage_object",
      targetIdColumnName: "storage_object_id",
    },
  ],
};

export default entity;
