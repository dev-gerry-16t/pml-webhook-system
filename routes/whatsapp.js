import { Router } from "express";
import GLOBAL_CONSTANTS from "../constants/constants.js";

const exchangeName = GLOBAL_CONSTANTS.EXCHANGE_WHATSAPP;
const routingKey = GLOBAL_CONSTANTS.ROUTING_KEY_WHATSAPP;
const exchangeType = "direct";
const router = Router();

const executePublisherWhatsApp = async (params) => {
  try {
    await Channel.assertExchange(exchangeName, exchangeType, {});

    Channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(params)),
      {
        persistent: true,
      }
    );
  } catch (error) {
    console.log("error", error);
  }
};

router.get("/messages", (req, res) => {
  const verify_token = GLOBAL_CONSTANTS.VERIFY_TOKEN_WHATSAPP;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === verify_token) {
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }
});

router.post("/messages", (req, res) => {
  const params = req.body;
  executePublisherWhatsApp(params);
  return res.status(200).send({
    message: "ok",
  });
});

export default router;
