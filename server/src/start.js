const { ApolloServer } = require('apollo-server');
const { createRequestContext } = require('./core/contextProvider');
const { mergeSchemaDefinitions } = require('./common/graphqlUtils');
const { path, pipe, intercept, not, isTestEnv } = require('./common/helpers');
const { logger, consoleTransport } = require('./common/logger');

setupLogging();

const { typeDefs, resolvers } = mergeSchemaDefinitions(
  require('./graphql/baseSchema'),
  require('./users/graphql/schema'),
  require('./decks/graphql/schema'),
  require('./notes/graphql/schema'),
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
