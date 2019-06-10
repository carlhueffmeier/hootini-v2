const server = require('./start');
const { createTestClient } = require('apollo-server-testing');
const { consoleMock } = require('./test/testUtils');

describe('Bootstrapping (start.js)', () => {
  var restore;

  beforeEach(() => {
    restore = consoleMock();
  });

  afterEach(() => {
    restore();
  });

  it('should respond to queries', async () => {
    const { query } = createTestClient(server);
    const result = await query({ query: 'query { debug }' });
    expect(result).toHaveProperty('data.debug');
  });
});
