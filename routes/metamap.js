import { Router } from "express";
import GLOBAL_CONSTANTS from "../constants/constants.js";
import crypto from "crypto";

const exchangeName = GLOBAL_CONSTANTS.EXCHANGE_METAMAP;
const routingKey = GLOBAL_CONSTANTS.ROUTING_KEY_METAMAP;
const exchangeType = "direct";
const router = Router();

const verify = (signature, secret, payloadBody) => {
  let hash = crypto.createHmac("sha256", secret);
  hash = hash.update(payloadBody).digest("hex");
  return hash === signature;
};

const executePublisherMetaMap = async (params) => {
  try {
    await Channel.assertExchange(exchangeName, exchangeType, {});

    Channel.publish(exchangeName, routingKey, Buffer.from(params), {
      persistent: true,
    });
  } catch (error) {
    console.log("error", error);
  }
};

router.post("/verification", (req, res) => {
  const params = req.body;
  const headers = req.headers;

  const jsonServiceResponse = JSON.stringify(params);
  const xHeaderAWSKey = GLOBAL_CONSTANTS.MATI_WEBHOOK_SECRET;
  const signatureMati = headers["x-signature"];

  const isValidPayload = verify(
    signatureMati,
    xHeaderAWSKey,
    jsonServiceResponse
  );
  if (isValidPayload === true) {
    executePublisherMetaMap(jsonServiceResponse);
    return res.status(200).send({
      message: "ok",
    });
  } else {
    return res.status(401).send({
      message: "Error in validation signature",
    });
  }
});

export default router;
