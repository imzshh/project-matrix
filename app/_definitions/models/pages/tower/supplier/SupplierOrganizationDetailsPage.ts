import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig, SonicEntityDetailsRockConfig } from "@ruiapp/rapid-extension";
import { materialFormatStrTemplate } from "~/utils/fmt";

const orderItemFormConfig: Partial<RapidEntityFormConfig> = {
  items: [
    {
      type: "auto",
      code: "orderNum",
    },
    {
      type: "auto",
      code: "subject",
      listDataFindOptions: {
        properties: ["id", "code", "name", "specification", "defaultUnit"],
      },
      formControlProps: {
        dropdownMatchSelectWidth: 500,
        listTextFormat: materialFormatStrTemplate,
        listFilterFields: ["name", "code", "specification"],
        columns: [
          { code: "code", title: "编号", width: 120 },
          { code: "name", title: "名称", width: 120 },
          { code: "specification", title: "规格", width: 120 },
        ],
      },
    },
    {
      type: "auto",
      code: "name",
    },
    {
      type: "auto",
      code: "tags",
    },
    {
      type: "textarea",
      code: "description",
    },
    {
      type: "auto",
      code: "quantity",
    },
    {
      type: "auto",
      code: "unit",
    },
    {
      type: "auto",
      code: "price",
    },
    {
      type: "auto",
      code: "taxRate",
    },
  ],
  onValuesChange: [
    {
      $action: "script",
      script: `
        const changedValues = event.args[0] || {};
        if(changedValues.hasOwnProperty('subject')) {
          const _ = event.framework.getExpressionVars()._;
          const materials = _.get(event.scope.stores['dataFormItemList-subject'], 'data.list');
          const subject = _.find(materials, function (item) { return item.id == changedValues.subject });
          const name = subject.name + (subject.specification ? ' (' + subject.specification + ')' : '');
          const unitId = _.get(subject, 'defaultUnit.id');
          event.page.sendComponentMessage(event.sender.$id, {
            name: "setFieldsValue",
            payload: {
              name: name,
              unit: unitId,
            }
          });
        }
      `,
    },
  ],
};

const page: RapidPage = {
  code: "supplier_organization_details",
  name: "企业信息",
  title: "企业信息",
  permissionCheck: { any: [] },
  view: [
    {
      $type: "sonicEntityDetails",
      entityCode: "BasePartner",
      titlePropertyCode: "name",
      statePropertyCode: "state",
      column: 3,
      descriptionItems: [],
      $exps: {
        entityId: "$rui.parseQuery().id",
      },
    } satisfies SonicEntityDetailsRockConfig,
  ],
};

export default page;
