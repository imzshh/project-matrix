import type { RapidEntityFormRockConfig, RapidPage, SonicEntityListRockConfig } from "@ruiapp/rapid-extension";

const page: RapidPage = {
  code: "iot_type_details",
  name: "类型详情",
  title: "类型详情",
  permissionCheck: { any: ["iot.manage"] },
  view: [
    {
      $type: "rapidEntityForm",
      entityCode: "IotType",
      mode: "view",
      column: 3,
      items: [
        {
          type: "auto",
          code: "code",
        },
        {
          type: "auto",
          code: "name",
        },
        {
          type: "auto",
          code: "state",
        },
        {
          type: "auto",
          code: "description",
        },
      ],
      $exps: {
        entityId: "$rui.parseQuery().id",
      },
    } satisfies RapidEntityFormRockConfig,
    {
      $type: "antdTabs",
      items: [
        {
          key: "things",
          label: "物品",
          children: [
            {
              $id: "thingList",
              $type: "sonicEntityList",
              entityCode: "IotThing",
              viewMode: "table",
              fixedFilters: [
                {
                  field: "type",
                  operator: "exists",
                  filters: [
                    {
                      field: "id",
                      operator: "eq",
                      value: "",
                    },
                  ],
                },
              ],
              orderBy: [
                {
                  field: "code",
                },
              ],
              extraActions: [
                {
                  $type: "sonicToolbarFormItem",
                  formItemType: "search",
                  placeholder: "搜索编号、描述",
                  actionEventName: "onSearch",
                  filterMode: "contains",
                  filterFields: ["code", "description"],
                },
              ],
              columns: [
                {
                  type: "auto",
                  code: "state",
                  width: "100px",
                },
                {
                  type: "link",
                  code: "code",
                  fixed: "left",
                  width: "200px",
                  rendererProps: {
                    url: "/pages/iot_thing_details?id={{id}}",
                  },
                },
                {
                  type: "auto",
                  code: "accessToken",
                  width: "300px",
                },
                {
                  type: "auto",
                  code: "description",
                },
                {
                  type: "auto",
                  code: "createdAt",
                  width: "150px",
                },
              ],
              $exps: {
                "fixedFilters[0].filters[0].value": "$rui.parseQuery().id",
              },
            } satisfies SonicEntityListRockConfig,
          ],
        },
      ],
    },
  ],
  stores: [
    {
      type: "entityStore",
      name: "sysActionGroups",
      entityCode: "SysActionGroup",
      properties: ["id", "code", "name", "orderNum"],
      filters: [],
      orderBy: [
        {
          field: "orderNum",
        },
      ],
    },
    {
      type: "entityStore",
      name: "sysActions",
      entityCode: "SysAction",
      properties: ["id", "code", "name", "group", "orderNum"],
      filters: [],
      orderBy: [
        {
          field: "group_id",
        },
        {
          field: "orderNum",
        },
      ],
    },
  ],
};

export default page;
