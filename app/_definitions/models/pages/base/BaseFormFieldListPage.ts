import { cloneDeep } from "lodash";
import type { RapidPage, RapidEntityFormConfig } from "@ruiapp/rapid-extension";

const formConfig: Partial<RapidEntityFormConfig> = {
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
      code: "fieldType",
    },
    {
      type: "auto",
      code: "state",
    },
    {
      type: "textarea",
      code: "description",
    },
  ],
};

const page: RapidPage = {
  code: "base_form_field_list",
  name: "表单字段列表",
  title: "表单字段管理",
  permissionCheck: { any: ["dev.manage"] },
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "BaseFormField",
      viewMode: "table",
      selectionMode: "none",
      listActions: [
        {
          $type: "sonicToolbarNewEntityButton",
          text: "新建",
          icon: "PlusOutlined",
          actionStyle: "primary",
        },
      ],
      extraActions: [
        {
          $type: "sonicToolbarFormItem",
          formItemType: "search",
          placeholder: "搜索名称、编号",
          actionEventName: "onSearch",
          filterMode: "contains",
          filterFields: ["code", "name"],
        },
      ],
      columns: [
        {
          type: "link",
          code: "code",
          width: "250px",
        },
        {
          type: "auto",
          code: "name",
        },
        {
          type: "auto",
          code: "description",
        },
        {
          type: "auto",
          code: "fieldType",
          width: "150px",
        },
        {
          type: "auto",
          code: "state",
          width: "150px",
        },
        {
          type: "auto",
          code: "createdAt",
          width: "150px",
        },
      ],
      actions: [
        {
          $type: "sonicRecordActionEditEntity",
          code: "edit",
          actionType: "edit",
          actionText: "修改",
        },
        {
          $type: "sonicRecordActionDeleteEntity",
          code: "delete",
          actionType: "delete",
          actionText: "删除",
          dataSourceCode: "list",
          entityCode: "BaseFormField",
        },
      ],
      newForm: cloneDeep(formConfig),
      editForm: cloneDeep(formConfig),
    },
  ],
};

export default page;
