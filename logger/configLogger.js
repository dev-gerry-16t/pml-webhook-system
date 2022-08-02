import "winston-mongodb";
import GLOBAL_CONSTANTS from "../constants/constants.js";
import moment from "moment";
import { createLogger, format, transports } from "winston";

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.simple(),
    format.timestamp(),
    format.printf((info) => {
      return `[${moment(info.timestamp)
        .utcOffset("-05:00")
        .format("YYYY/MMM/DD hh:mm:ss")}] ${info.level} ${info.message}`;
    })
  ),
  transports: [
    new transports.Console({
      level: "debug",
    }),
    new transports.MongoDB({
      level: "error",
      db: GLOBAL_CONSTANTS.DATABASE_LOGS,
      options: { useUnifiedTopology: true },
      collection: GLOBAL_CONSTANTS.LOG_DOCUMENT_ERROR,
    }),
    new transports.MongoDB({
      level: "warn",
      db: GLOBAL_CONSTANTS.DATABASE_LOGS,
      options: { useUnifiedTopology: true },
      collection: GLOBAL_CONSTANTS.LOG_DOCUMENT_WARNING,
    }),
  ],
});

export default logger;
