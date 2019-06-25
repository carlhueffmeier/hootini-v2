const faker = require('faker');
const { Logger, consoleTransport } = require('./logger');
const { uniq } = require('./helpers');
const { consoleMock } = require('./testUtils');

const aMessage = faker.lorem.sentences();

describe('Logger', () => {
  var logger;

  beforeEach(() => {
    logger = Logger.new();
  });

  it('should be able to create new Logger', () => {
    expect(Logger.isPrototypeOf(logger)).toBe(true);
  });

  it('should log on all transports', () => {
    const transportA = jest.fn();
    const transportB = jest.fn();
    logger.addTransport(transportA, transportB);

    logger.info(aMessage);

    const expectedInvocation = [[{ logLevel: 'INFO', message: aMessage }]];
    expect(transportA.mock.calls).toEqual(expectedInvocation);
    expect(transportB.mock.calls).toEqual(expectedInvocation);
  });

  it('should expose singleton instance', () => {
    const { logger } = require('./logger');
    expect(Logger.isPrototypeOf(logger)).toBe(true);
  });

  it('should expose distinct logLevels', () => {
    const { logLevel } = require('./logger');
    const allLevels = Object.values(logLevel);
    const uniqueLevels = uniq(allLevels);
    expect(uniqueLevels.length).toBe(allLevels.length);
  });

  describe('console transport', () => {
    var restoreConsole;

    beforeEach(() => {
      restoreConsole = consoleMock();
    });

    afterEach(() => {
      restoreConsole();
    });

    it("should call .log() for log level 'INFO'", () => {
      logger.addTransport(consoleTransport());
      logger.info(aMessage);
      const expectedCalls = [[aMessage]];
      expect(console.log.mock.calls).toEqual(expectedCalls);
    });

    it("should call .warn() for log level 'WARN'", () => {
      logger.addTransport(consoleTransport());
      logger.warn(aMessage);
      const expectedCalls = [[aMessage]];
      expect(console.warn.mock.calls).toEqual(expectedCalls);
    });

    it("should call .error() for log level 'ERROR'", () => {
      logger.addTransport(consoleTransport());
      logger.error(aMessage);
      const expectedCalls = [[aMessage]];
      expect(console.error.mock.calls).toEqual(expectedCalls);
    });
  });
});
