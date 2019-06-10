const graphqlUtils = require('./graphqlUtils');

describe('graphqlUtils', () => {
  it('mergeSchemaDefinitions', () => {
    const definitions = [
      {
        typeDefs: 'abc',
        resolvers: { Query: { me: { name: 'NameResolver' } } },
      },
      {
        typeDefs: ['def', 'ghi'],
        resolvers: { Query: { me: { email: 'EmailResolver' } } },
      },
    ];
    const result = graphqlUtils.mergeSchemaDefinitions(...definitions);
    expect(result).toEqual({
      typeDefs: ['abc', 'def', 'ghi'],
      resolvers: {
        Query: {
          me: { name: 'NameResolver', email: 'EmailResolver' },
        },
      },
    });
  });
});
