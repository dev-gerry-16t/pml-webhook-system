import Rascal from "rascal";
import config from "../config/configQueue.js";

const { BrokerAsPromised: Broker } = Rascal;

async function connectPublishRascal() {
  try {
    const broker = await Broker.create(config);
    broker.on("error", console.error);
    broker.on("error", console.error);
    broker.on("connection", console.log);
    console.log("ok");
    return broker;
  } catch (error) {
    throw error;
  }
}

export default connectPublishRascal;
