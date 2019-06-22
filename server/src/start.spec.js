const server = require('./start');
const { createTestClient } = require('apollo-server-testing');

describe('Bootstrapping (start.js)', () => {
  it('should respond to queries', async () => {
    const { query } = createTestClient(server);
    const result = await query({ query: 'query { debug }' });
    expect(result).toHaveProperty('data.debug');
  });
});
