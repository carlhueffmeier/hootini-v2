const BaseSchema = require('./baseSchema');
const { mountSchemas } = require('./utils/testUtils');

describe('BaseSchema', () => {
  describe('Query', () => {
    it('debug', async () => {
      const { query } = mountSchemas([BaseSchema], { findMe: 'egg' });
      const result = await query({ query: 'query { debug }' });
      expect(result).toHaveProperty('data.debug.findMe', 'egg');
    });
  });
});
