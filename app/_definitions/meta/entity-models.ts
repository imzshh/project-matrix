import type { RapidEntity as TRapidEntity } from '@ruiapp/rapid-extension';
import { autoConfigureRapidEntity } from '@ruiapp/rapid-extension';
import AppClient from '../models/entities/AppClient';
import AppNavItem from '../models/entities/AppNavItem';
import EcmDocument from '../models/entities/EcmDocument';
import EcmRevision from '../models/entities/EcmRevision';
import EcmStorageObject from '../models/entities/EcmStorageObject';
import FinAccount from '../models/entities/FinAccount';
import FinBusinessCategory from '../models/entities/FinBusinessCategory';
import FinExpenseCategory from '../models/entities/FinExpenseCategory';
import FinTransaction from '../models/entities/FinTransaction';
import HuateGCMS from '../models/entities/HuateGCMS';
import HuateWarehouseOperation from '../models/entities/HuateWarehouseOperation';
import KisConfig from '../models/entities/KisConfig';
import MetaDataDictionary from '../models/entities/MetaDataDictionary';
import MetaDataDictionaryEntry from '../models/entities/MetaDataDictionaryEntry';
import MetaModel from '../models/entities/MetaModel';
import MetaProperty from '../models/entities/MetaProperty';
import MetaRoute from '../models/entities/MetaRoute';
import MomAssemblyMain from '../models/entities/MomAssemblyMain';
import MomAssemblyPart from '../models/entities/MomAssemblyPart';
import MomEquipment from '../models/entities/MomEquipment';
import MomEquipmentCategory from '../models/entities/MomEquipmentCategory';
import MomEquipmentCategoryDimension from '../models/entities/MomEquipmentCategoryDimension';
import MomFactory from '../models/entities/MomFactory';
import MomGood from '../models/entities/MomGood';
import MomGoodLabel from '../models/entities/MomGoodLabel';
import MomGoodLocation from '../models/entities/MomGoodLocation';
import MomGoodTransfer from '../models/entities/MomGoodTransfer';
import MomInspectionCategory from '../models/entities/MomInspectionCategory';
import MomInspectionCharacteristic from '../models/entities/MomInspectionCharacteristic';
import MomInspectionCharacteristicCategory from '../models/entities/MomInspectionCharacteristicCategory';
import MomInspectionDefect from '../models/entities/MomInspectionDefect';
import MomInspectionDefectCategory from '../models/entities/MomInspectionDefectCategory';
import MomInspectionDefectStat from '../models/entities/MomInspectionDefectStat';
import MomInspectionInstrument from '../models/entities/MomInspectionInstrument';
import MomInspectionInstrumentCategory from '../models/entities/MomInspectionInstrumentCategory';
import MomInspectionMeasurement from '../models/entities/MomInspectionMeasurement';
import MomInspectionMethod from '../models/entities/MomInspectionMethod';
import MomInspectionRule from '../models/entities/MomInspectionRule';
import MomInspectionSampling from '../models/entities/MomInspectionSampling';
import MomInspectionSamplingItem from '../models/entities/MomInspectionSamplingItem';
import MomInspectionSheet from '../models/entities/MomInspectionSheet';
import MomInspectionSheetSample from '../models/entities/MomInspectionSheetSample';
import MomInventory from '../models/entities/MomInventory';
import MomInventoryApplication from '../models/entities/MomInventoryApplication';
import MomInventoryApplicationItem from '../models/entities/MomInventoryApplicationItem';
import MomInventoryBusinessType from '../models/entities/MomInventoryBusinessType';
import MomInventoryCheckRecord from '../models/entities/MomInventoryCheckRecord';
import MomInventoryLabel from '../models/entities/MomInventoryLabel';
import MomInventoryOperation from '../models/entities/MomInventoryOperation';
import MomInventoryStatTable from '../models/entities/MomInventoryStatTable';
import MomInventoryStatTrigger from '../models/entities/MomInventoryStatTrigger';
import MomLab from '../models/entities/MomLab';
import MomLine from '../models/entities/MomLine';
import MomManufacturingResourcePlan from '../models/entities/MomManufacturingResourcePlan';
import MomMasterProductionSchedule from '../models/entities/MomMasterProductionSchedule';
import MomMasterProductionScheduleItem from '../models/entities/MomMasterProductionScheduleItem';
import MomMaterialBreakdown from '../models/entities/MomMaterialBreakdown';
import MomMaterialBreakdownPart from '../models/entities/MomMaterialBreakdownPart';
import MomMaterialInventoryBalance from '../models/entities/MomMaterialInventoryBalance';
import MomMaterialInventoryLog from '../models/entities/MomMaterialInventoryLog';
import MomMaterialLotInventoryBalance from '../models/entities/MomMaterialLotInventoryBalance';
import MomMaterialLotInventoryLog from '../models/entities/MomMaterialLotInventoryLog';
import MomMaterialLotWarehouseInventoryBalance from '../models/entities/MomMaterialLotWarehouseInventoryBalance';
import MomMaterialLotWarehouseInventoryLog from '../models/entities/MomMaterialLotWarehouseInventoryLog';
import MomMaterialWarehouseInventoryBalance from '../models/entities/MomMaterialWarehouseInventoryBalance';
import MomMaterialWarehouseInventoryLog from '../models/entities/MomMaterialWarehouseInventoryLog';
import MomMaterialWarehouseLocationInventoryBalance from '../models/entities/MomMaterialWarehouseLocationInventoryBalance';
import MomMaterialWarehouseLocationInventoryLog from '../models/entities/MomMaterialWarehouseLocationInventoryLog';
import MomPackage from '../models/entities/MomPackage';
import MomPackageGood from '../models/entities/MomPackageGood';
import MomPrintLog from '../models/entities/MomPrintLog';
import MomPrintTemplate from '../models/entities/MomPrintTemplate';
import MomProcess from '../models/entities/MomProcess';
import MomProcessCategory from '../models/entities/MomProcessCategory';
import MomRoute from '../models/entities/MomRoute';
import MomRouteProcess from '../models/entities/MomRouteProcess';
import MomRouteProcessInput from '../models/entities/MomRouteProcessInput';
import MomRouteProcessOutput from '../models/entities/MomRouteProcessOutput';
import MomRouteProcessParameter from '../models/entities/MomRouteProcessParameter';
import MomRouteProcessParameterMeasurement from '../models/entities/MomRouteProcessParameterMeasurement';
import MomRouteTemplate from '../models/entities/MomRouteTemplate';
import MomRouteTemplateProcess from '../models/entities/MomRouteTemplateProcess';
import MomShift from '../models/entities/MomShift';
import MomShop from '../models/entities/MomShop';
import MomStation from '../models/entities/MomStation';
import MomTransportOperation from '../models/entities/MomTransportOperation';
import MomTransportOperationItem from '../models/entities/MomTransportOperationItem';
import MomWarehouse from '../models/entities/MomWarehouse';
import MomWarehouseStrategy from '../models/entities/MomWarehouseStrategy';
import MomWorkFeed from '../models/entities/MomWorkFeed';
import MomWorkFeedTask from '../models/entities/MomWorkFeedTask';
import MomWorkOrder from '../models/entities/MomWorkOrder';
import MomWorkReport from '../models/entities/MomWorkReport';
import MomWorkTask from '../models/entities/MomWorkTask';
import MomWorkTeam from '../models/entities/MomWorkTeam';
import MomWorkTrack from '../models/entities/MomWorkTrack';
import OcDepartment from '../models/entities/OcDepartment';
import OcRole from '../models/entities/OcRole';
import OcUser from '../models/entities/OcUser';
import ShopfloorApp from '../models/entities/ShopfloorApp';
import ShopfloorAppStep from '../models/entities/ShopfloorAppStep';
import ShopfloorAppVersion from '../models/entities/ShopfloorAppVersion';
import ShopfloorDisplayDevice from '../models/entities/ShopfloorDisplayDevice';
import ShopfloorDisplayDeviceFeature from '../models/entities/ShopfloorDisplayDeviceFeature';
import ShopfloorStation from '../models/entities/ShopfloorStation';
import SvcPrintTask from '../models/entities/SvcPrintTask';
import SvcPrinter from '../models/entities/SvcPrinter';
import SysAction from '../models/entities/SysAction';
import SysActionGroup from '../models/entities/SysActionGroup';
import SysAuditLog from '../models/entities/SysAuditLog';
import SysWebhook from '../models/entities/SysWebhook';
import YidaConfig from '../models/entities/YidaConfig';
import base$BaseBuilding from '../models/entities/base/BaseBuilding';
import base$BaseCustomerCategory from '../models/entities/base/BaseCustomerCategory';
import base$BaseEmployee from '../models/entities/base/BaseEmployee';
import base$BaseFormField from '../models/entities/base/BaseFormField';
import base$BaseGate from '../models/entities/base/BaseGate';
import base$BaseLocation from '../models/entities/base/BaseLocation';
import base$BaseLot from '../models/entities/base/BaseLot';
import base$BaseMaterial from '../models/entities/base/BaseMaterial';
import base$BaseMaterialCategory from '../models/entities/base/BaseMaterialCategory';
import base$BaseMaterialDocument from '../models/entities/base/BaseMaterialDocument';
import base$BaseMaterialType from '../models/entities/base/BaseMaterialType';
import base$BaseOffice from '../models/entities/base/BaseOffice';
import base$BasePartner from '../models/entities/base/BasePartner';
import base$BasePartnerCategory from '../models/entities/base/BasePartnerCategory';
import base$BaseSupplierCategory from '../models/entities/base/BaseSupplierCategory';
import base$BaseUnit from '../models/entities/base/BaseUnit';
import base$BaseUnitCategory from '../models/entities/base/BaseUnitCategory';
import bpm$BpmInstance from '../models/entities/bpm/BpmInstance';
import bpm$BpmJob from '../models/entities/bpm/BpmJob';
import bpm$BpmManualTask from '../models/entities/bpm/BpmManualTask';
import bpm$BpmProcess from '../models/entities/bpm/BpmProcess';
import bpm$BpmProcessCategory from '../models/entities/bpm/BpmProcessCategory';
import bpm$BpmProcessRevision from '../models/entities/bpm/BpmProcessRevision';
import cbs$CbsContract from '../models/entities/cbs/CbsContract';
import cbs$CbsContractFile from '../models/entities/cbs/CbsContractFile';
import cbs$CbsContractFundingBudget from '../models/entities/cbs/CbsContractFundingBudget';
import cbs$CbsContractRelation from '../models/entities/cbs/CbsContractRelation';
import cbs$CbsContractRelationKind from '../models/entities/cbs/CbsContractRelationKind';
import cbs$CbsOrder from '../models/entities/cbs/CbsOrder';
import cbs$CbsOrderItem from '../models/entities/cbs/CbsOrderItem';
import cbs$CbsPurchaseOrderCategory from '../models/entities/cbs/CbsPurchaseOrderCategory';
import iot$DataSource from '../models/entities/iot/DataSource';
import iot$IotGateway from '../models/entities/iot/IotGateway';
import iot$IotProperty from '../models/entities/iot/IotProperty';
import iot$IotRule from '../models/entities/iot/IotRule';
import iot$IotThing from '../models/entities/iot/IotThing';
import iot$IotType from '../models/entities/iot/IotType';
import iot$Machine from '../models/entities/iot/Machine';
import iot$MachineAttribute from '../models/entities/iot/MachineAttribute';
import iot$MachineAttributeBind from '../models/entities/iot/MachineAttributeBind';
import iot$MachineField from '../models/entities/iot/MachineField';
import iot$MachineState from '../models/entities/iot/MachineState';
import iot$MachineTrigger from '../models/entities/iot/MachineTrigger';
import iot$MachineType from '../models/entities/iot/MachineType';
import pm$PmMilestone from '../models/entities/pm/PmMilestone';
import pm$PmPhase from '../models/entities/pm/PmPhase';
import pm$PmProject from '../models/entities/pm/PmProject';
import pm$PmProjectBudget from '../models/entities/pm/PmProjectBudget';
import pm$PmProjectCategory from '../models/entities/pm/PmProjectCategory';
import pm$PmProjectCost from '../models/entities/pm/PmProjectCost';
import pm$PmProjectCostCategory from '../models/entities/pm/PmProjectCostCategory';
import pm$PmProjectEvent from '../models/entities/pm/PmProjectEvent';
import pm$PmProjectRole from '../models/entities/pm/PmProjectRole';
import pm$PmProjectWorkItemStepRole from '../models/entities/pm/PmProjectWorkItemStepRole';
import pm$PmProjectWorkItemType from '../models/entities/pm/PmProjectWorkItemType';
import pm$PmWorkItem from '../models/entities/pm/PmWorkItem';
import pm$PmWorkItemResolution from '../models/entities/pm/PmWorkItemResolution';
import pm$PmWorkItemStep from '../models/entities/pm/PmWorkItemStep';
import pm$PmWorkItemType from '../models/entities/pm/PmWorkItemType';
import pm$PmWorkItemTypeStep from '../models/entities/pm/PmWorkItemTypeStep';
import setting$SystemSettingGroupSetting from '../models/entities/setting/SystemSettingGroupSetting';
import setting$SystemSettingItem from '../models/entities/setting/SystemSettingItem';
import setting$SystemSettingItemSetting from '../models/entities/setting/SystemSettingItemSetting';
import utility$Notification from '../models/entities/utility/Notification';

const entityDefinitions = [
  AppClient,
  AppNavItem,
  EcmDocument,
  EcmRevision,
  EcmStorageObject,
  FinAccount,
  FinBusinessCategory,
  FinExpenseCategory,
  FinTransaction,
  HuateGCMS,
  HuateWarehouseOperation,
  KisConfig,
  MetaDataDictionary,
  MetaDataDictionaryEntry,
  MetaModel,
  MetaProperty,
  MetaRoute,
  MomAssemblyMain,
  MomAssemblyPart,
  MomEquipment,
  MomEquipmentCategory,
  MomEquipmentCategoryDimension,
  MomFactory,
  MomGood,
  MomGoodLabel,
  MomGoodLocation,
  MomGoodTransfer,
  MomInspectionCategory,
  MomInspectionCharacteristic,
  MomInspectionCharacteristicCategory,
  MomInspectionDefect,
  MomInspectionDefectCategory,
  MomInspectionDefectStat,
  MomInspectionInstrument,
  MomInspectionInstrumentCategory,
  MomInspectionMeasurement,
  MomInspectionMethod,
  MomInspectionRule,
  MomInspectionSampling,
  MomInspectionSamplingItem,
  MomInspectionSheet,
  MomInspectionSheetSample,
  MomInventory,
  MomInventoryApplication,
  MomInventoryApplicationItem,
  MomInventoryBusinessType,
  MomInventoryCheckRecord,
  MomInventoryLabel,
  MomInventoryOperation,
  MomInventoryStatTable,
  MomInventoryStatTrigger,
  MomLab,
  MomLine,
  MomManufacturingResourcePlan,
  MomMasterProductionSchedule,
  MomMasterProductionScheduleItem,
  MomMaterialBreakdown,
  MomMaterialBreakdownPart,
  MomMaterialInventoryBalance,
  MomMaterialInventoryLog,
  MomMaterialLotInventoryBalance,
  MomMaterialLotInventoryLog,
  MomMaterialLotWarehouseInventoryBalance,
  MomMaterialLotWarehouseInventoryLog,
  MomMaterialWarehouseInventoryBalance,
  MomMaterialWarehouseInventoryLog,
  MomMaterialWarehouseLocationInventoryBalance,
  MomMaterialWarehouseLocationInventoryLog,
  MomPackage,
  MomPackageGood,
  MomPrintLog,
  MomPrintTemplate,
  MomProcess,
  MomProcessCategory,
  MomRoute,
  MomRouteProcess,
  MomRouteProcessInput,
  MomRouteProcessOutput,
  MomRouteProcessParameter,
  MomRouteProcessParameterMeasurement,
  MomRouteTemplate,
  MomRouteTemplateProcess,
  MomShift,
  MomShop,
  MomStation,
  MomTransportOperation,
  MomTransportOperationItem,
  MomWarehouse,
  MomWarehouseStrategy,
  MomWorkFeed,
  MomWorkFeedTask,
  MomWorkOrder,
  MomWorkReport,
  MomWorkTask,
  MomWorkTeam,
  MomWorkTrack,
  OcDepartment,
  OcRole,
  OcUser,
  ShopfloorApp,
  ShopfloorAppStep,
  ShopfloorAppVersion,
  ShopfloorDisplayDevice,
  ShopfloorDisplayDeviceFeature,
  ShopfloorStation,
  SvcPrintTask,
  SvcPrinter,
  SysAction,
  SysActionGroup,
  SysAuditLog,
  SysWebhook,
  YidaConfig,
  base$BaseBuilding,
  base$BaseCustomerCategory,
  base$BaseEmployee,
  base$BaseFormField,
  base$BaseGate,
  base$BaseLocation,
  base$BaseLot,
  base$BaseMaterial,
  base$BaseMaterialCategory,
  base$BaseMaterialDocument,
  base$BaseMaterialType,
  base$BaseOffice,
  base$BasePartner,
  base$BasePartnerCategory,
  base$BaseSupplierCategory,
  base$BaseUnit,
  base$BaseUnitCategory,
  bpm$BpmInstance,
  bpm$BpmJob,
  bpm$BpmManualTask,
  bpm$BpmProcess,
  bpm$BpmProcessCategory,
  bpm$BpmProcessRevision,
  cbs$CbsContract,
  cbs$CbsContractFile,
  cbs$CbsContractFundingBudget,
  cbs$CbsContractRelation,
  cbs$CbsContractRelationKind,
  cbs$CbsOrder,
  cbs$CbsOrderItem,
  cbs$CbsPurchaseOrderCategory,
  iot$DataSource,
  iot$IotGateway,
  iot$IotProperty,
  iot$IotRule,
  iot$IotThing,
  iot$IotType,
  iot$Machine,
  iot$MachineAttribute,
  iot$MachineAttributeBind,
  iot$MachineField,
  iot$MachineState,
  iot$MachineTrigger,
  iot$MachineType,
  pm$PmMilestone,
  pm$PmPhase,
  pm$PmProject,
  pm$PmProjectBudget,
  pm$PmProjectCategory,
  pm$PmProjectCost,
  pm$PmProjectCostCategory,
  pm$PmProjectEvent,
  pm$PmProjectRole,
  pm$PmProjectWorkItemStepRole,
  pm$PmProjectWorkItemType,
  pm$PmWorkItem,
  pm$PmWorkItemResolution,
  pm$PmWorkItemStep,
  pm$PmWorkItemType,
  pm$PmWorkItemTypeStep,
  setting$SystemSettingGroupSetting,
  setting$SystemSettingItem,
  setting$SystemSettingItemSetting,
  utility$Notification,
];
const configuredEntities:TRapidEntity[] = [
  autoConfigureRapidEntity(AppClient, entityDefinitions),
  autoConfigureRapidEntity(AppNavItem, entityDefinitions),
  autoConfigureRapidEntity(EcmDocument, entityDefinitions),
  autoConfigureRapidEntity(EcmRevision, entityDefinitions),
  autoConfigureRapidEntity(EcmStorageObject, entityDefinitions),
  autoConfigureRapidEntity(FinAccount, entityDefinitions),
  autoConfigureRapidEntity(FinBusinessCategory, entityDefinitions),
  autoConfigureRapidEntity(FinExpenseCategory, entityDefinitions),
  autoConfigureRapidEntity(FinTransaction, entityDefinitions),
  autoConfigureRapidEntity(HuateGCMS, entityDefinitions),
  autoConfigureRapidEntity(HuateWarehouseOperation, entityDefinitions),
  autoConfigureRapidEntity(KisConfig, entityDefinitions),
  autoConfigureRapidEntity(MetaDataDictionary, entityDefinitions),
  autoConfigureRapidEntity(MetaDataDictionaryEntry, entityDefinitions),
  autoConfigureRapidEntity(MetaModel, entityDefinitions),
  autoConfigureRapidEntity(MetaProperty, entityDefinitions),
  autoConfigureRapidEntity(MetaRoute, entityDefinitions),
  autoConfigureRapidEntity(MomAssemblyMain, entityDefinitions),
  autoConfigureRapidEntity(MomAssemblyPart, entityDefinitions),
  autoConfigureRapidEntity(MomEquipment, entityDefinitions),
  autoConfigureRapidEntity(MomEquipmentCategory, entityDefinitions),
  autoConfigureRapidEntity(MomEquipmentCategoryDimension, entityDefinitions),
  autoConfigureRapidEntity(MomFactory, entityDefinitions),
  autoConfigureRapidEntity(MomGood, entityDefinitions),
  autoConfigureRapidEntity(MomGoodLabel, entityDefinitions),
  autoConfigureRapidEntity(MomGoodLocation, entityDefinitions),
  autoConfigureRapidEntity(MomGoodTransfer, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionCategory, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionCharacteristic, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionCharacteristicCategory, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionDefect, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionDefectCategory, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionDefectStat, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionInstrument, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionInstrumentCategory, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionMeasurement, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionMethod, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionRule, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionSampling, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionSamplingItem, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionSheet, entityDefinitions),
  autoConfigureRapidEntity(MomInspectionSheetSample, entityDefinitions),
  autoConfigureRapidEntity(MomInventory, entityDefinitions),
  autoConfigureRapidEntity(MomInventoryApplication, entityDefinitions),
  autoConfigureRapidEntity(MomInventoryApplicationItem, entityDefinitions),
  autoConfigureRapidEntity(MomInventoryBusinessType, entityDefinitions),
  autoConfigureRapidEntity(MomInventoryCheckRecord, entityDefinitions),
  autoConfigureRapidEntity(MomInventoryLabel, entityDefinitions),
  autoConfigureRapidEntity(MomInventoryOperation, entityDefinitions),
  autoConfigureRapidEntity(MomInventoryStatTable, entityDefinitions),
  autoConfigureRapidEntity(MomInventoryStatTrigger, entityDefinitions),
  autoConfigureRapidEntity(MomLab, entityDefinitions),
  autoConfigureRapidEntity(MomLine, entityDefinitions),
  autoConfigureRapidEntity(MomManufacturingResourcePlan, entityDefinitions),
  autoConfigureRapidEntity(MomMasterProductionSchedule, entityDefinitions),
  autoConfigureRapidEntity(MomMasterProductionScheduleItem, entityDefinitions),
  autoConfigureRapidEntity(MomMaterialBreakdown, entityDefinitions),
  autoConfigureRapidEntity(MomMaterialBreakdownPart, entityDefinitions),
  autoConfigureRapidEntity(MomMaterialInventoryBalance, entityDefinitions),
  autoConfigureRapidEntity(MomMaterialInventoryLog, entityDefinitions),
  autoConfigureRapidEntity(MomMaterialLotInventoryBalance, entityDefinitions),
  autoConfigureRapidEntity(MomMaterialLotInventoryLog, entityDefinitions),
  autoConfigureRapidEntity(MomMaterialLotWarehouseInventoryBalance, entityDefinitions),
  autoConfigureRapidEntity(MomMaterialLotWarehouseInventoryLog, entityDefinitions),
  autoConfigureRapidEntity(MomMaterialWarehouseInventoryBalance, entityDefinitions),
  autoConfigureRapidEntity(MomMaterialWarehouseInventoryLog, entityDefinitions),
  autoConfigureRapidEntity(MomMaterialWarehouseLocationInventoryBalance, entityDefinitions),
  autoConfigureRapidEntity(MomMaterialWarehouseLocationInventoryLog, entityDefinitions),
  autoConfigureRapidEntity(MomPackage, entityDefinitions),
  autoConfigureRapidEntity(MomPackageGood, entityDefinitions),
  autoConfigureRapidEntity(MomPrintLog, entityDefinitions),
  autoConfigureRapidEntity(MomPrintTemplate, entityDefinitions),
  autoConfigureRapidEntity(MomProcess, entityDefinitions),
  autoConfigureRapidEntity(MomProcessCategory, entityDefinitions),
  autoConfigureRapidEntity(MomRoute, entityDefinitions),
  autoConfigureRapidEntity(MomRouteProcess, entityDefinitions),
  autoConfigureRapidEntity(MomRouteProcessInput, entityDefinitions),
  autoConfigureRapidEntity(MomRouteProcessOutput, entityDefinitions),
  autoConfigureRapidEntity(MomRouteProcessParameter, entityDefinitions),
  autoConfigureRapidEntity(MomRouteProcessParameterMeasurement, entityDefinitions),
  autoConfigureRapidEntity(MomRouteTemplate, entityDefinitions),
  autoConfigureRapidEntity(MomRouteTemplateProcess, entityDefinitions),
  autoConfigureRapidEntity(MomShift, entityDefinitions),
  autoConfigureRapidEntity(MomShop, entityDefinitions),
  autoConfigureRapidEntity(MomStation, entityDefinitions),
  autoConfigureRapidEntity(MomTransportOperation, entityDefinitions),
  autoConfigureRapidEntity(MomTransportOperationItem, entityDefinitions),
  autoConfigureRapidEntity(MomWarehouse, entityDefinitions),
  autoConfigureRapidEntity(MomWarehouseStrategy, entityDefinitions),
  autoConfigureRapidEntity(MomWorkFeed, entityDefinitions),
  autoConfigureRapidEntity(MomWorkFeedTask, entityDefinitions),
  autoConfigureRapidEntity(MomWorkOrder, entityDefinitions),
  autoConfigureRapidEntity(MomWorkReport, entityDefinitions),
  autoConfigureRapidEntity(MomWorkTask, entityDefinitions),
  autoConfigureRapidEntity(MomWorkTeam, entityDefinitions),
  autoConfigureRapidEntity(MomWorkTrack, entityDefinitions),
  autoConfigureRapidEntity(OcDepartment, entityDefinitions),
  autoConfigureRapidEntity(OcRole, entityDefinitions),
  autoConfigureRapidEntity(OcUser, entityDefinitions),
  autoConfigureRapidEntity(ShopfloorApp, entityDefinitions),
  autoConfigureRapidEntity(ShopfloorAppStep, entityDefinitions),
  autoConfigureRapidEntity(ShopfloorAppVersion, entityDefinitions),
  autoConfigureRapidEntity(ShopfloorDisplayDevice, entityDefinitions),
  autoConfigureRapidEntity(ShopfloorDisplayDeviceFeature, entityDefinitions),
  autoConfigureRapidEntity(ShopfloorStation, entityDefinitions),
  autoConfigureRapidEntity(SvcPrintTask, entityDefinitions),
  autoConfigureRapidEntity(SvcPrinter, entityDefinitions),
  autoConfigureRapidEntity(SysAction, entityDefinitions),
  autoConfigureRapidEntity(SysActionGroup, entityDefinitions),
  autoConfigureRapidEntity(SysAuditLog, entityDefinitions),
  autoConfigureRapidEntity(SysWebhook, entityDefinitions),
  autoConfigureRapidEntity(YidaConfig, entityDefinitions),
  autoConfigureRapidEntity(base$BaseBuilding, entityDefinitions),
  autoConfigureRapidEntity(base$BaseCustomerCategory, entityDefinitions),
  autoConfigureRapidEntity(base$BaseEmployee, entityDefinitions),
  autoConfigureRapidEntity(base$BaseFormField, entityDefinitions),
  autoConfigureRapidEntity(base$BaseGate, entityDefinitions),
  autoConfigureRapidEntity(base$BaseLocation, entityDefinitions),
  autoConfigureRapidEntity(base$BaseLot, entityDefinitions),
  autoConfigureRapidEntity(base$BaseMaterial, entityDefinitions),
  autoConfigureRapidEntity(base$BaseMaterialCategory, entityDefinitions),
  autoConfigureRapidEntity(base$BaseMaterialDocument, entityDefinitions),
  autoConfigureRapidEntity(base$BaseMaterialType, entityDefinitions),
  autoConfigureRapidEntity(base$BaseOffice, entityDefinitions),
  autoConfigureRapidEntity(base$BasePartner, entityDefinitions),
  autoConfigureRapidEntity(base$BasePartnerCategory, entityDefinitions),
  autoConfigureRapidEntity(base$BaseSupplierCategory, entityDefinitions),
  autoConfigureRapidEntity(base$BaseUnit, entityDefinitions),
  autoConfigureRapidEntity(base$BaseUnitCategory, entityDefinitions),
  autoConfigureRapidEntity(bpm$BpmInstance, entityDefinitions),
  autoConfigureRapidEntity(bpm$BpmJob, entityDefinitions),
  autoConfigureRapidEntity(bpm$BpmManualTask, entityDefinitions),
  autoConfigureRapidEntity(bpm$BpmProcess, entityDefinitions),
  autoConfigureRapidEntity(bpm$BpmProcessCategory, entityDefinitions),
  autoConfigureRapidEntity(bpm$BpmProcessRevision, entityDefinitions),
  autoConfigureRapidEntity(cbs$CbsContract, entityDefinitions),
  autoConfigureRapidEntity(cbs$CbsContractFile, entityDefinitions),
  autoConfigureRapidEntity(cbs$CbsContractFundingBudget, entityDefinitions),
  autoConfigureRapidEntity(cbs$CbsContractRelation, entityDefinitions),
  autoConfigureRapidEntity(cbs$CbsContractRelationKind, entityDefinitions),
  autoConfigureRapidEntity(cbs$CbsOrder, entityDefinitions),
  autoConfigureRapidEntity(cbs$CbsOrderItem, entityDefinitions),
  autoConfigureRapidEntity(cbs$CbsPurchaseOrderCategory, entityDefinitions),
  autoConfigureRapidEntity(iot$DataSource, entityDefinitions),
  autoConfigureRapidEntity(iot$IotGateway, entityDefinitions),
  autoConfigureRapidEntity(iot$IotProperty, entityDefinitions),
  autoConfigureRapidEntity(iot$IotRule, entityDefinitions),
  autoConfigureRapidEntity(iot$IotThing, entityDefinitions),
  autoConfigureRapidEntity(iot$IotType, entityDefinitions),
  autoConfigureRapidEntity(iot$Machine, entityDefinitions),
  autoConfigureRapidEntity(iot$MachineAttribute, entityDefinitions),
  autoConfigureRapidEntity(iot$MachineAttributeBind, entityDefinitions),
  autoConfigureRapidEntity(iot$MachineField, entityDefinitions),
  autoConfigureRapidEntity(iot$MachineState, entityDefinitions),
  autoConfigureRapidEntity(iot$MachineTrigger, entityDefinitions),
  autoConfigureRapidEntity(iot$MachineType, entityDefinitions),
  autoConfigureRapidEntity(pm$PmMilestone, entityDefinitions),
  autoConfigureRapidEntity(pm$PmPhase, entityDefinitions),
  autoConfigureRapidEntity(pm$PmProject, entityDefinitions),
  autoConfigureRapidEntity(pm$PmProjectBudget, entityDefinitions),
  autoConfigureRapidEntity(pm$PmProjectCategory, entityDefinitions),
  autoConfigureRapidEntity(pm$PmProjectCost, entityDefinitions),
  autoConfigureRapidEntity(pm$PmProjectCostCategory, entityDefinitions),
  autoConfigureRapidEntity(pm$PmProjectEvent, entityDefinitions),
  autoConfigureRapidEntity(pm$PmProjectRole, entityDefinitions),
  autoConfigureRapidEntity(pm$PmProjectWorkItemStepRole, entityDefinitions),
  autoConfigureRapidEntity(pm$PmProjectWorkItemType, entityDefinitions),
  autoConfigureRapidEntity(pm$PmWorkItem, entityDefinitions),
  autoConfigureRapidEntity(pm$PmWorkItemResolution, entityDefinitions),
  autoConfigureRapidEntity(pm$PmWorkItemStep, entityDefinitions),
  autoConfigureRapidEntity(pm$PmWorkItemType, entityDefinitions),
  autoConfigureRapidEntity(pm$PmWorkItemTypeStep, entityDefinitions),
  autoConfigureRapidEntity(setting$SystemSettingGroupSetting, entityDefinitions),
  autoConfigureRapidEntity(setting$SystemSettingItem, entityDefinitions),
  autoConfigureRapidEntity(setting$SystemSettingItemSetting, entityDefinitions),
  autoConfigureRapidEntity(utility$Notification, entityDefinitions),
];
export default configuredEntities;
