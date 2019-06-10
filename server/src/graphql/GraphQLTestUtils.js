const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server');
const BaseSchema = require('./BaseSchema');
const { isArray } = require('../utils/helpers');

function mountSchema(schema, context = {}) {
  const { typeDefs, resolvers } =
    schema !== BaseSchema
      ? mergeSchemaDefinitions(BaseSchema, schema)
      : BaseSchema;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => getContext(context),
  });

  return createTestClient(server);
}

function mergeSchemaDefinitions(...schemas) {
  return schemas.reduce(
    (result, schema) => {
      if (isArray(schema.typeDefs)) {
        schema.typeDefs.forEach(typeDef => result.typeDefs.push(typeDef));
      } else {
        result.typeDefs.push(schema.typeDefs);
      }
      Object.assign(result.resolvers, schema.resolvers || {});
      return result;
    },
    { typeDefs: [], resolvers: {} },
  );
}

function getContext(context) {
  return typeof context === 'function' ? context() : context;
}

exports.mountSchema = mountSchema;
