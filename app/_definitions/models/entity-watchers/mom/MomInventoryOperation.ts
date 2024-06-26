import type {EntityWatcher, EntityWatchHandlerContext, IRpdServer} from "@ruiapp/rapid-core";
import {MomInventoryOperationType} from "~/_definitions/meta/data-dictionary-types";
import {
  MomGood,
  MomGoodTransfer,
  MomInventoryApplication,
  type MomInventoryBusinessType,
  type MomInventoryOperation,
  MomInventoryStatTable,
  MomInventoryStatTrigger, MomWarehouse, SaveBaseLotInput, SaveMomGoodInput, SaveMomInventoryOperationInput,
} from "~/_definitions/meta/entity-types";
import InventoryStatService, {StatTableConfig} from "~/services/InventoryStatService";
import KisHelper from "~/sdk/kis/helper";
import KisInventoryOperationAPI from "~/sdk/kis/inventory";
import momGoodTransfer from "~/_definitions/models/entities/MomGoodTransfer";

export default [
  {
    eventName: "entity.create",
    modelSingularCode: "mom_inventory_operation",
    handler: async (ctx: EntityWatchHandlerContext<"entity.create">) => {
      const {server, payload} = ctx;
      const changes = payload.after;
      try {
        if (changes?.application) {
          const applicationManager = server.getEntityManager<MomGood>("mom_inventory_application");
          await applicationManager.updateEntityById({
            id: changes.application.id,
            entityToSave: {
              operationState: "processing",
            },
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  {
    eventName: "entity.update",
    modelSingularCode: "mom_inventory_operation",
    handler: async (ctx: EntityWatchHandlerContext<"entity.update">) => {
      const {server, payload} = ctx;
      const kisApi = await new KisHelper(server).NewAPIClient();
      const kisOperationApi = new KisInventoryOperationAPI(kisApi);


      const changes: Partial<MomInventoryOperation> = payload.changes;
      const after = payload.after;
      if (after.operationType === "in") {
        if (changes.hasOwnProperty("state") && changes.state === "done") {
          await server.getEntityManager<MomInventoryApplication>("mom_inventory_application").updateEntityById({
            id: after.application_id,
            entityToSave: {
              operationState: "done",
            },
          });


          // TODO: 生成KIS入库单
          // switch (businessType?.name) {
          //   case "采购入库":
          //     await kisOperationApi.createProductReceipt({
          //       Object: {
          //         Head: {},
          //         Entry: [{}],
          //       },
          //     } as WarehouseInPayload)
          //     break;
          //   case "生产入库":
          //     await kisOperationApi.createPickingList({
          //       Object: {
          //         Head: {},
          //         Entry: [{}],
          //       },
          //     } as WarehouseOutPayload)
          //     break;
          //   default:
          //     break;
          // }
        }
      }

      if (after.operationType === "out") {
        if (changes.hasOwnProperty("state") && changes.state === "done") {

          const inventoryApplication = await server.getEntityManager<MomInventoryApplication>("mom_inventory_application").findEntity({
            filters: [
              {
                operator: "eq",
                field: "id",
                value: after.application_id,
              },
            ],
            properties: ["id", "from", "to", "businessType"],
          });

          const inventoryBusinessType = await server.getEntityManager<MomInventoryBusinessType>("mom_inventory_business_type").findEntity({
            filters: [
              {
                operator: "eq",
                field: "name",
                value: "调拨入库",
              },
            ],
            properties: ["id", "operationType"],
          });

          if (inventoryApplication?.businessType && inventoryApplication.businessType.name == "库存调拨") {

            const goodTransfers = await server.getEntityManager<MomGoodTransfer>("mom_good_transfer").findEntities({
              filters: [
                {
                  operator: "eq",
                  field: "operation_id",
                  value: after.id,
                },
              ],
              properties: ["id", "material", "unit", "good", "quantity", "binNum", "lotNum", "manufactureDate", "validityDate", "lot"],
            });

            let inventoryOperationInput = {
              application_id: after.application_id,
              operationType: inventoryBusinessType?.operationType,
              state: "processing",
              businessType: {id: inventoryBusinessType?.id},
              warehouse: {id: inventoryApplication?.to?.id},
            } as SaveMomInventoryOperationInput

            // convert goodTransfers to inventoryOperationInput.transfers
            let transfers = [];
            for (const goodTransfer of goodTransfers) {
              transfers.push({
                good: {id: goodTransfer.good?.id},
                material: {id: goodTransfer.material?.id},
                unit: {id: goodTransfer.unit?.id},
                quantity: goodTransfer.quantity,
                binNum: goodTransfer.binNum,
                lotNum: goodTransfer.lotNum,
                manufactureDate: goodTransfer.manufactureDate,
                validityDate: goodTransfer.validityDate,
                lot: {id: goodTransfer.lot?.id},
                orderNum: 1,
              } as MomGoodTransfer);
            }

            inventoryOperationInput.transfers = transfers

            await server.getEntityManager<MomInventoryOperation>("mom_inventory_operation").createEntity({
              entity: inventoryOperationInput,
            })
          }
        }
      }

      if (changes.hasOwnProperty("approvalState") && changes.approvalState === "approved") {
        let transfers = await listTransfersOfOperation(server, after.id);

        await updateInventoryStats(server, after.business_id, after.operationType, transfers);
      }
    },
  },
] satisfies EntityWatcher<any>[];

async function listTransfersOfOperation(server: IRpdServer, operationId: number) {
  const transferManager = server.getEntityManager<MomGoodTransfer>("mom_good_transfer");

  return await transferManager.findEntities({
    filters: [
      {
        operator: "eq",
        field: "operation_id",
        value: operationId,
      },
    ],
    keepNonPropertyFields: true,
  });
}

async function updateInventoryStats(server: IRpdServer, businessId: number, operationType: MomInventoryOperationType, transfers: any[]) {
  const businessTypeManager = server.getEntityManager<MomInventoryBusinessType>("mom_inventory_business_type");
  const businessType = await businessTypeManager.findById(businessId);
  if (!businessType) {
    return;
  }

  const statTriggerName = businessType?.config?.statTriggerName;

  let quantityFieldsToIncrease: string[] = [];
  let quantityFieldsToDecrease: string[] = [];
  const defaultGroupFields = ["material_id", "tags"];
  if (statTriggerName) {
    const statTriggerManager = server.getEntityManager<MomInventoryStatTrigger>("mom_inventory_stat_trigger");
    const statTrigger = await statTriggerManager.findEntity({
      filters: [
        {
          operator: "eq",
          field: "name",
          value: businessType.config?.statTriggerName,
        },
      ],
    });

    quantityFieldsToIncrease = statTrigger?.config?.quantityFieldsToIncrease || [];
    quantityFieldsToDecrease = statTrigger?.config?.quantityFieldsToDecrease || [];
  }

  const statTableManager = server.getEntityManager<MomInventoryStatTable>("mom_inventory_stat_table");
  const statTables = await statTableManager.findEntities({});

  const inventoryStatService = new InventoryStatService(server);

  // TODO: get to_location_id from transfers and get warehouse by location_id
  for (const transfer of transfers) {
    if (transfer?.to_location_id) {

      const warehouseId = await server.queryDatabaseObject(
        `
        SELECT get_root_location_id($1) AS id;
      `,
        [transfer.to_location_id]
      );

      transfer['warehouse_id'] = warehouseId[0]?.id;


      if (transfer.lot_id) {
        const lotManager = server.getEntityManager<MomWarehouse>("base_lot");
        await lotManager.updateEntityById({
          id: transfer.lot_id,
          entityToSave: {
            state: "normal",
          } as SaveBaseLotInput,
        });
      }

    }
    if (transfer?.from_location_id) {
      const warehouseId = await server.queryDatabaseObject(
        `
        SELECT get_root_location_id($1) AS id;
      `,
        [transfer.from_location_id]
      );

      transfer['warehouse_id'] = warehouseId[0]?.id;
    }
  }

  for (const transfer of transfers) {
    for (const statTable of statTables) {
      const statTableConfig: StatTableConfig = statTable.config as any;
      const quantityBalanceFields: string[] = statTableConfig.quantityBalanceFields;
      if (!quantityBalanceFields) {
        continue;
      }

      const groupFields: string[] = statTableConfig.groupFields || defaultGroupFields;
      let quantityChange = transfer.quantity;
      if (operationType === "out") {
        quantityChange *= -1;
      }

      await inventoryStatService.changeInventoryQuantities({
        balanceEntityCode: statTableConfig.balanceEntityCode,
        logEntityCode: statTableConfig.logEntityCode,
        quantityBalanceFields: quantityBalanceFields,
        quantityChangeFields: statTableConfig.quantityChangeFields,
        groupFields: groupFields,
        groupValues: transfer,
        quantityFieldsToIncrease,
        quantityFieldsToDecrease,
        change: quantityChange,
      });
    }
  }
}
