import moment from "moment";
import isNil from "lodash/isNil.js";
import isEmpty from "lodash/isEmpty.js";
import isObject from "lodash/isObject.js";
import logger from "../logger/configLogger.js";

const LoggerSystem = (
  sp = "",
  paramsIn = {},
  paramsOut = {},
  error = {},
  location = {}
) => {
  const dateTime = moment()
    .utcOffset("-05:00")
    .format("YYYY/MMM/DD hh:mm:ss a");
  const errorMessage =
    isNil(error) === false &&
    isObject(error) === true &&
    isNil(error.message) === false &&
    isEmpty(error.message) === false
      ? error.message
      : "";
  const errorSystem = isNil(error) === false ? error : "";
  const objectLogString = JSON.stringify({
    dateTime,
    errorMessage,
    errorSystem,
    paramsIn,
    paramsOut,
    location,
    storeProcedure: sp,
  });
  return {
    error: () => {
      logger.error(objectLogString);
    },
    warn: () => {
      logger.warn(objectLogString);
    },
    info: () => {
      logger.info(sp);
    },
  };
};

export default LoggerSystem;
