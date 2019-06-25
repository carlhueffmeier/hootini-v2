/*global jest*/

function consoleMock() {
  const originalConsole = global.console;
  const keysToMock = ['log', 'warn', 'error'];
  keysToMock.forEach(key => {
    global.console[key] = jest.fn();
  });

  const restore = () => (global.console = originalConsole);
  return restore;
}

exports.consoleMock = consoleMock;
