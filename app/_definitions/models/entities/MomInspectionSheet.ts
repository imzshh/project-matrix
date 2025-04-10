import type { TDictionaryCodes } from "../../meta/data-dictionary-codes";
import type { TEntitySingularCodes } from "../../meta/model-codes";
import type { RapidEntity } from "@ruiapp/rapid-extension";
import type { PropertySequenceConfig } from "@ruiapp/rapid-core";

const entity: RapidEntity<TEntitySingularCodes, TDictionaryCodes> = {
  namespace: "mom",
  code: "MomInspectionSheet",
  name: "检验单",
  description: "记录对一个或多个样本使用某个检验规则进行的一次检验，包含被检测样本的信息以及本次检验产生的多条检验记录和缺陷记录。",
  fields: [
    {
      code: "code",
      name: "检验单号",
      type: "text",
      config: {
        sequence: {
          enabled: true,
          config: {
            segments: [
              {
                type: "literal",
                content: "IS-",
              },
              {
                type: "year",
                length: 4,
              },
              {
                type: "month",
                length: 2,
                padding: "0",
              },
              {
                type: "dayOfMonth",
                length: 2,
                padding: "0",
              },
              {
                type: "autoIncrement",
                scope: "",
                period: "day",
                length: 3,
              },
            ],
          },
        } satisfies PropertySequenceConfig,
      },
    },
    {
      code: "approvalState",
      name: "审批状态",
      type: "option",
      dataDictionary: "ApprovalState",
    },
    {
      code: "state",
      name: "检验单状态",
      type: "option",
      dataDictionary: "MomInspectionSheetState",
    },
    {
      code: "result",
      name: "检验结果",
      type: "option",
      dataDictionary: "InspectionResult",
    },
    {
      code: "treatment",
      name: "处理方式",
      type: "option",
      dataDictionary: "MomInspectionSheetTreatment",
    },
    {
      code: "material",
      name: "物品",
      type: "relation",
      targetSingularCode: "base_material",
      targetIdColumnName: "material_id",
    },
    {
      code: "materialCode",
      name: "物料号",
      type: "text",
    },
    {
      code: "materialAbbr",
      name: "牌号",
      type: "text",
    },
    {
      code: "productStage",
      name: "产品阶段",
      type: "text",
    },
    {
      code: "lotNum",
      name: "批号",
      type: "text",
    },
    {
      code: "serialNum",
      name: "序列号",
      type: "text",
    },
    {
      code: "productionTime",
      name: "生产完成时间",
      type: "datetime",
    },
    {
      code: "samplingTime",
      name: "取样时间",
      type: "datetime",
    },
    {
      code: "sampleDeliveryTime",
      name: "送样时间",
      type: "datetime",
    },
    {
      code: "sampleCount",
      name: "样本数量",
      type: "integer",
      defaultValue: "1",
    },
    {
      code: "workOrder",
      name: "生产工单",
      type: "relation",
      targetSingularCode: "mom_work_order",
      targetIdColumnName: "work_order_id",
    },
    {
      code: "workTrack",
      name: "生产流转单",
      type: "relation",
      targetSingularCode: "mom_work_track",
      targetIdColumnName: "work_track_id",
    },
    {
      code: "workTask",
      name: "生产任务",
      type: "relation",
      targetSingularCode: "mom_work_task",
      targetIdColumnName: "work_task_id",
    },
    {
      code: "inventoryOperation",
      name: "库存操作单",
      type: "relation",
      targetSingularCode: "mom_inventory_operation",
      targetIdColumnName: "inventory_operation_id",
    },
    {
      code: "rule",
      name: "检验规则",
      type: "relation",
      targetSingularCode: "mom_inspection_rule",
      targetIdColumnName: "rule_id",
    },
    {
      code: "routeProcess",
      name: "生产工序",
      type: "relation",
      targetSingularCode: "mom_route_process",
      targetIdColumnName: "route_process_id",
    },
    {
      code: "sender",
      name: "送检人",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "sender_id",
    },
    {
      code: "inspector",
      name: "检验员",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "inspector_id",
    },
    {
      code: "reviewer",
      name: "审核人",
      type: "relation",
      targetSingularCode: "oc_user",
      targetIdColumnName: "reviewer_id",
    },
    {
      code: "measurements",
      name: "检验记录",
      type: "relation[]",
      targetSingularCode: "mom_inspection_measurement",
      selfIdColumnName: "sheet_id",
    },
    {
      code: "defectStats",
      name: "缺陷统计",
      type: "relation[]",
      targetSingularCode: "mom_inspection_defect_stat",
      selfIdColumnName: "sheet_id",
    },
    {
      code: "lot",
      name: "批号信息",
      type: "relation",
      targetSingularCode: "base_lot",
      targetIdColumnName: "lot_id",
    },
    {
      code: "samples",
      name: "样本记录",
      type: "relation[]",
      targetSingularCode: "mom_inspection_sheet_sample",
      selfIdColumnName: "sheet_id",
      entityDeletingReaction: "cascadingDelete",
    },
    {
      code: "remark",
      name: "备注",
      type: "text",
    },
    {
      code: "abnormalDescription",
      name: "异常描述",
      type: "text",
    },
    {
      code: "round",
      name: "检验轮次",
      type: "integer",
      required: true,
      defaultValue: "1",
    },
    {
      code: "inspectedAt",
      name: "检验完成时间",
      type: "datetime",
    },
    {
      code: "acceptQuantity",
      name: "收货数量",
      type: "double",
    },
    {
      code: "acceptPalletCount",
      name: "收货托数",
      type: "double",
    },
  ],
  // indexes: [
  //   {
  //     unique: true,
  //     properties: ["material", "inventoryOperation", "lotNum"],
  //   },
  // ]
};

export default entity;
