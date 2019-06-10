const BaseSchema = require('./BaseSchema');
const { mountSchema } = require('./GraphQLTestUtils');

describe('BaseSchema', () => {
  describe('Query', () => {
    it('debug', async () => {
      const { query } = mountSchema(BaseSchema, { findMe: 'egg' });
      const result = await query({ query: 'query { debug }' });
      expect(result).toHaveProperty('data.debug.findMe', 'egg');
    });
  });
});
