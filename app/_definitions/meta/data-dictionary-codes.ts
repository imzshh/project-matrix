const dictionaryCodes = [
  'ActiveInactiveState',
  'ApprovalState',
  'BaseLocationType',
  'BaseLotState',
  'BusinessActivityKind',
  'BusinessActivityState',
  'BusinessApplicationState',
  'BusinessInstanceState',
  'BusinessProcessState',
  'BusinessTaskState',
  'CbsContractKind',
  'CbsContractState',
  'CbsOrderKind',
  'CbsOrderState',
  'ConfirmationState',
  'DataDictionaryValueType',
  'DocumentType',
  'EmployeeState',
  'EnabledDisabledState',
  'FinTransactionType',
  'FormFieldType',
  'InspectionDetermineType',
  'InspectionKind',
  'InspectionResult',
  'MaterialSourceType',
  'DataDictionaryLevel',
  'PropertyType',
  'RouteHttpMethod',
  'RouteType',
  'MomApplicationSource',
  'MomEquipmentPowerState',
  'MomEquipmentProductionState',
  'MomGoodState',
  'MomInspectionSheetState',
  'MomInspectionSheetTreatment',
  'MomInventoryOperationState',
  'MomInventoryOperationType',
  'MomMpsExecutionState',
  'MomMpsScheduleState',
  'MomMrpExecutionState',
  'MomMrpPlanningState',
  'MomPackageGoodState',
  'MomWorkOrderAssignmentState',
  'MomWorkOrderExecutionState',
  'MomWorkTaskAssignmentState',
  'MomWorkTaskExecutionState',
  'MomWorkTrackAssignmentState',
  'MomWorkTrackExecutionState',
  'PmBudgetType',
  'PmMilestoneState',
  'PmPhaseState',
  'PmProjectStage',
  'PmProjectState',
  'PmWorkItemState',
  'PmWorkItemStepState',
  'PrintTaskState',
  'PrinterNetworkState',
  'PublishState',
  'QualificationState',
  'QualitativeInspectionDetermineType',
  'QuantityType',
  'UndeletedDeletedState',
  'UnitType',
  'UserSecretLevel',
  'WarehouseStrategy',
  'SettingItemType',
  'SysAuditLogMethod',
  'SysAuditLogTarget',
  'SysCronJobRunningResult',
  'SysEventLogLevel',
  'SysEventSourceType',
  'SysExtEntitySyncState',
] as const;
export type TDictionaryCodes = typeof dictionaryCodes[number];
