import { Router } from "express";
import GLOBAL_CONSTANTS from "../constants/constants.js";
const router = Router();

const executePublisherWhatsApp = async (params) => {
  try {
    const publication = await Broker.publish("toWhatsApp", params);
    publication.on("error", console.error);
    publication.on("close", console.error);
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
