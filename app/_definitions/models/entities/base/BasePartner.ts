import type { TDictionaryCodes } from "../../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "app",
  code: "BasePartner",
  name: "合作伙伴",
  fields: [
    {
      code: "code",
      name: "编码",
      type: "text",
    },
    {
      code: "name",
      name: "名称",
      type: "text",
      required: true,
    },
    {
      code: "types",
      name: "类型",
      type: "option[]",
      dataDictionary: "BasePartnerType",
    },
    {
      code: "categories",
      name: "分类",
      type: "relation[]",
      targetSingularCode: "base_partner_category",
      linkTableName: "base_partner_partner_category_link",
      targetIdColumnName: "category_id",
      selfIdColumnName: "partner_id",
    },
    {
      code: "externalCode",
      name: "外部编号",
      type: "text",
    },
    {
      code: "factory",
      name: "工厂",
      type: "relation",
      targetSingularCode: "mom_factory",
      targetIdColumnName: "factory_id",
    },
    {
      code: "supplierCategories",
      name: "供应商分类",
      type: "relation[]",
      targetSingularCode: "base_supplier_category",
      linkTableName: "base_partner_supplier_category_link",
      targetIdColumnName: "category_id",
      selfIdColumnName: "partner_id",
    },
    {
      code: "customerCategories",
      name: "客户分类",
      type: "relation[]",
      targetSingularCode: "base_customer_category",
      linkTableName: "base_partner_customer_category_link",
      targetIdColumnName: "category_id",
      selfIdColumnName: "partner_id",
    },
  ],
};

export default entity;
