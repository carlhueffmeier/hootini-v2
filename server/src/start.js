const { ApolloServer } = require('apollo-server');
const { mergeSchemaDefinitions } = require('./utils/graphqlUtils');
const { createRequestContext } = require('./core/ContextProvider');
const { path, pipe, intercept, not, isTestEnv } = require('./utils/helpers');
const { logger, consoleTransport } = require('./utils/logger');

setupLogging();

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
  logger.info(`🚀  Server ready at ${url}`);
});

function setupLogging() {
  const transport = pipe([intercept(not(isTestEnv), consoleTransport())]);
  logger.addTransport(transport);
}

module.exports = server;
