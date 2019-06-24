const BaseSchema = require('./BaseSchema');
const { mountSchemas } = require('./GraphQLTestUtils');

describe('BaseSchema', () => {
  describe('Query', () => {
    it('debug', async () => {
      const { query } = mountSchemas([BaseSchema], { findMe: 'egg' });
      const result = await query({ query: 'query { debug }' });
      expect(result).toHaveProperty('data.debug.findMe', 'egg');
    });
  });
});
