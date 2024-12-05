import Aedes, { AuthenticateError } from "aedes";
import { createServer } from "net";
import type IotPlugin from "rapid-plugins/iot/IotPlugin";
import type { Logger, RapidServer } from "@ruiapp/rapid-core";

export interface StartMqttServerOptions {
  rapidServer: RapidServer;
  logger: Logger;
  iotPlugin: IotPlugin;
}

const clients: Map<string, any> = new Map();

const clientManager = {
  registerClient(clientId: string, info: any) {
    clients.set(clientId, info);
  },

  unregisterClient(clientId: string) {
    clients.delete(clientId);
  },

  getClient(clientId: string) {
    return clients.get(clientId);
  },
};

export function startMqttServer(options: StartMqttServerOptions) {
  const { logger, iotPlugin } = options;

  const port = 1883;

  const aedes = new Aedes();
  const mqttServer = createServer(aedes.handle);

  aedes.authenticate = async function (client, username, password, callback) {
    try {
      if (!username) {
        const authError = new Error("Authenticate failed: Access token is required.") as AuthenticateError;
        authError.returnCode = 4; //AuthErrorCode.BAD_USERNAME_OR_PASSWORD;
        callback(authError, false);
        return;
      }

      const authResult = await iotPlugin.iotService.authenticateByAccessToken(username);
      if (!authResult.success) {
        const authError = new Error("Authenticate failed: " + authResult.errorMessage) as AuthenticateError;
        authError.returnCode = 4; //AuthErrorCode.BAD_USERNAME_OR_PASSWORD;
        callback(authError, false);
        return;
      }

      clientManager.registerClient(client.id, authResult);
      callback(null, true);
    } catch (ex: any) {
      const authError = new Error("Authenticate failed: " + ex.message) as AuthenticateError;
      authError.returnCode = 3; // AuthErrorCode.SERVER_UNAVAILABLE
      callback(authError, false);
    }
  };

  aedes.on("publish", async (packet, client) => {
    let payload = packet.payload.toString();
    try {
      payload = JSON.parse(payload);
    } catch (ex) {
      logger.warn("Failed to parse payload as JSON.", {
        topic: packet.topic,
        properties: packet.properties,
        payload,
      });
    }

    const { topic } = packet;
    const mqttMessage = {
      topic,
      payload,
    };
    logger.info("[MQTT] [PUBLISH]", mqttMessage);

    if (client) {
      const sender = clientManager.getClient(client.id);
      if (sender) {
        await iotPlugin.mqttMessageHandler.onPublish(sender, mqttMessage);
      }
    }
  });

  mqttServer.listen(port, function () {
    console.info("[MQTT] MQTT server started and listening on port ", port);
  });
}
