import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "BaseMaterialType",
  name: "物料类型",
  fields: [
    {
      code: "materials",
      name: "物料",
      type: "relation[]",
      targetSingularCode: "base_material",
      linkTableName: "base_material_type_material_links",
      targetIdColumnName: "material_id",
      selfIdColumnName: "type_id",
    },
    {
      code: "code",
      name: "编号",
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
      code: "config",
      name: "配置",
      type: "json",
    },
    {
      code: "factory",
      name: "工厂",
      type: "relation",
      targetSingularCode: "mom_factory",
      targetIdColumnName: "factory_id",
    },
  ],
};

export default entity;
