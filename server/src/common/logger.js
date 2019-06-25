const logLevel = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

const Logger = {
  new() {
    const logger = Object.create(Logger);
    logger.transports = [];
    return logger;
  },
  addTransport(...transports) {
    transports.forEach(t => this.transports.push(t));
  },
  info: logWithLevel(logLevel.INFO),
  warn: logWithLevel(logLevel.WARN),
  error: logWithLevel(logLevel.ERROR),
};

function logWithLevel(logLevel) {
  return function log(message) {
    this.transports.forEach(transport => {
      transport({ logLevel, message });
    });
  };
}

function consoleTransport() {
  const handlers = {
    [logLevel.INFO]: console.log,
    [logLevel.WARN]: console.warn,
    [logLevel.ERROR]: console.error,
  };
  return function consoleTransport({ logLevel, message } = {}) {
    handlers[logLevel](message);
  };
}

module.exports = {
  Logger,
  logger: Logger.new(),
  logLevel,
  consoleTransport,
};
