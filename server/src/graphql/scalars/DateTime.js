const gql = require('graphql-tag');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

exports.typeDef = gql`
  scalar DateTime
`;

exports.resolvers = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Date custom scalar type',
    // Value from the client
    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
    // Value sent to the client
    serialize(value) {
      return new Date(value).toISOString();
    },
  }),
};
