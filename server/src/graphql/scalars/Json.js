const gql = require('graphql-tag');
const GraphQLJson = require('graphql-type-json');

exports.typeDef = gql`
  scalar Json
`;

exports.resolvers = {
  Json: GraphQLJson,
};
