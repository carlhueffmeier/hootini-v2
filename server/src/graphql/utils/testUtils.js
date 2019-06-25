const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server');
const BaseSchema = require('../baseSchema');
const { isArray, merge } = require('../../common/helpers');

function mountSchemas(schemas, context = {}) {
  const { typeDefs, resolvers } = mergeSchemaDefinitions([
    BaseSchema,
    ...schemas,
  ]);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => getContext(context),
  });

  return createTestClient(server);
}

function mergeSchemaDefinitions(schemas) {
  return schemas.reduce(
    (result, schema) => {
      if (isArray(schema.typeDefs)) {
        schema.typeDefs.forEach(typeDef => result.typeDefs.push(typeDef));
      } else {
        result.typeDefs.push(schema.typeDefs);
      }
      merge(result.resolvers, schema.resolvers);
      return result;
    },
    { typeDefs: [], resolvers: {} },
  );
}

function getContext(context) {
  return typeof context === 'function' ? context() : context;
}

exports.mountSchemas = mountSchemas;
