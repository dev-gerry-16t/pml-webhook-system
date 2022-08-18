import { Router } from "express";
import GLOBAL_CONSTANTS from "../constants/constants.js";
import crypto from "crypto";
const router = Router();

const verify = (signature, secret, payloadBody) => {
  let hash = crypto.createHmac("sha256", secret);
  hash = hash.update(payloadBody).digest("hex");
  return hash === signature;
};

const executePublisherMetaMap = async (params) => {
  try {
    console.log("send");
    const publication = await Broker.publish("toMetaMap", params);
    publication.on("error", console.error);
    publication.on("close", console.error);
  } catch (error) {
    console.log("error", error);
  }
};

router.post("/verification", (req, res) => {
  console.log("send");
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
    console.error("Error in validation signature");
    return res.status(401).send({
      message: "Error in validation signature",
    });
  }
});

export default router;
