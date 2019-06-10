const { ApolloServer } = require('apollo-server');
const { mergeSchemaDefinitions } = require('./utils/graphqlUtils');
const { createRequestContext } = require('./core/ContextProvider');
const { path } = require('./utils/helpers');

const { typeDefs, resolvers } = mergeSchemaDefinitions(
  require('./graphql/BaseSchema'),
  require('./users/UserSchema'),
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context(request) {
    const authToken = path(['headers', 'authorization'], request);
    return createRequestContext({ authToken });
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

module.exports = server;
