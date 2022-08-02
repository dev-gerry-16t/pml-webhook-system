"use-strict";

import "dotenv/config";
import express from "express";
import cors from "cors";
import GLOBAL_CONSTANTS from "./constants/constants.js";
import RouteWhatsApp from "./routes/whatsapp.js";
import RoutesMetaMap from "./routes/metamap.js";
import RoutesMandrill from "./routes/mandrill.js";
import connectPublish from "./publisherExchange/publisher.js";

const app = express();

global.Channel = null;

connectPublish()
  .then((channel) => {
    Channel = channel;
  })
  .catch((error) => {
    console.log("Error amqtp", error);
  });

app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    verify: (req, res, buf, encoding) => {
      req.rawBody = buf.toString();
    },
    strict: false,
    limit: "50mb",
  })
);
app.use(cors());

const port = process.env.PORT || GLOBAL_CONSTANTS.PORT;
app.get("/", (req, res) => {
  res.status(200).send("<h1>Not found</h1>");
});
app.use("/webhook/v1/whatsapp", RouteWhatsApp);
app.use("/webhook/v1/metamap", RoutesMetaMap);
app.use("/webhook/v1/mandrill", RoutesMandrill);

app.listen(port);
