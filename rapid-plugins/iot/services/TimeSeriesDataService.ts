import dayjs from "dayjs";
import type { ThingTelemetryValuesEntry, ThingTelemetryValues, TelemetryValuesOfThings, ThingCode } from "../IotPluginTypes";
import type TDengineAccessor from "rapid-plugins/iot/TDengineAccessor";
import type { IRpdServer, Logger, RouteContext } from "@ruiapp/rapid-core";
import type { IotMeasurementDataType, IotProperty, IotThing, IotType } from "../types/IotModelsTypes";
import { formatValueToSqlLiteral } from "../QueryBuilder";
import { mapTypePropertyDataTypeToTDEngineDataType, mapTypeMeasurementDataTypeToTDEngineDataType } from "../utils/DataTypeMapper";

export default class TimeSeriesDataService {
  #server: IRpdServer;
  #logger: Logger;
  #tDEngineAccessor: TDengineAccessor;

  constructor(server: IRpdServer, tDEngineAccessor: TDengineAccessor) {
    this.#server = server;
    this.#logger = server.getLogger();
    this.#tDEngineAccessor = tDEngineAccessor;
  }

  async createTableOfTypeWithFirstMeasurement(type: IotType, firstMeasurement: IotProperty) {
    const sql = `
CREATE STABLE type_${type.id} (
    ts timestamp,
    ${firstMeasurement.code} ${mapTypeMeasurementDataTypeToTDEngineDataType(firstMeasurement.dataType as IotMeasurementDataType)}
) TAGS (
    thing_id ${mapTypePropertyDataTypeToTDEngineDataType("integer")}
) COMMENT ${formatValueToSqlLiteral(type.name)};`;

    await this.#tDEngineAccessor.exec(sql);
  }

  async createColumnOfMeasurementProperty(type: IotType, measurement: IotProperty) {
    const sql = `
ALTER STABLE type_${type.id}
    ADD COLUMN ${measurement.code} ${mapTypeMeasurementDataTypeToTDEngineDataType(measurement.dataType as IotMeasurementDataType)};`;

    await this.#tDEngineAccessor.exec(sql);
  }

  async createTagOfDataTagProperty(type: IotType, measurement: IotProperty) {
    const sql = `
ALTER STABLE type_${type.id}
    ADD TAG ${measurement.code} ${mapTypeMeasurementDataTypeToTDEngineDataType(measurement.dataType as IotMeasurementDataType)};`;

    await this.#tDEngineAccessor.exec(sql);
  }

  async createTableOfThing(type: IotType, thing: IotThing) {
    const sql = `
CREATE TABLE IF NOT EXISTS
    thing_${thing.id} USING type_${type.id}
  (thing_id) TAGS (${thing.id});
  COMMENT ${formatValueToSqlLiteral(thing.code)};`;

    await this.#tDEngineAccessor.exec(sql);
  }

  async createTelemetryValuesOfThings(routeContext: RouteContext, telemetryValuesOfThings: TelemetryValuesOfThings) {
    const thingManager = this.#server.getEntityManager<IotThing>("iot_thing");

    for (const thingCode in telemetryValuesOfThings) {
      const thing = await thingManager.findEntity({
        routeContext,
        filters: [
          {
            operator: "eq",
            field: "code",
            value: thingCode,
          },
        ],
      });

      if (!thing) {
        throw new Error(`Thing with code "${thingCode}" was not found.`);
      }

      const thingId = thing.id;
      const telemetryValuesEntries = telemetryValuesOfThings[thingCode];
      for (const telemetryValuesEntry of telemetryValuesEntries) {
        await this.createTelemetryValuesOfThing(thingId, telemetryValuesEntry);
      }
    }
  }

  async createTelemetryValuesOfThing(thingId: number, entry: ThingTelemetryValuesEntry) {
    let ts: number;
    let telemetryValues: ThingTelemetryValues;
    if (entry.ts && entry.values) {
      ts = entry.ts as number;
      telemetryValues = entry.values as ThingTelemetryValues;
    } else {
      ts = dayjs().valueOf();
      telemetryValues = entry as ThingTelemetryValues;
    }

    await this.saveTelemetryValuesToTsdb(thingId, ts, telemetryValues);
  }

  async saveTelemetryValuesToTsdb(thingId: number, ts: number, telemetryValues: ThingTelemetryValues) {
    const tableName = `thing_${thingId}`;
    const keys = Object.keys(telemetryValues);
    const values = keys.map((key) => telemetryValues[key]);

    const sql = `INSERT INTO ${tableName} (ts, ${keys.join(",")}) VALUES (${ts}, ${values.join(",")})`;
    this.#logger.debug(`Executing sql in tdengine: ${sql}`);

    await this.#tDEngineAccessor.exec(sql);
  }
}