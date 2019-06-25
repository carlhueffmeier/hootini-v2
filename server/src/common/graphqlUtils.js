const { isArray } = require('./helpers');
const merge = require('lodash.merge');

function mergeSchemaDefinitions(...schemas) {
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

exports.mergeSchemaDefinitions = mergeSchemaDefinitions;
