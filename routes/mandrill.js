import { Router } from "express";
import GLOBAL_CONSTANTS from "../constants/constants.js";

const exchangeName = GLOBAL_CONSTANTS.EXCHANGE_MANDRILL;
const routingKey = GLOBAL_CONSTANTS.ROUTING_KEY_MANDRILL;
const exchangeType = "direct";
const router = Router();

const executePublisherMandrill = async (params) => {
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

router.post("/status", (req, res) => {
  const params = req.body;
  executePublisherMandrill(params);
  return res.status(200).send({
    message: "ok",
  });
});

export default router;
