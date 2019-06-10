const gql = require('graphql-tag');

const {
  typeDef: DateTime,
  resolvers: dateTimeResolvers,
} = require('./scalars/DateTime');
const {
  typeDef: JsonType,
  resolvers: jsonResolvers,
} = require('./scalars/Json');

const _baseTypes = gql`
  type Query {
    debug: Json
  }
  type Mutation {
    _empty: String
  }
`;

const globalResolvers = {
  Query: {
    debug: (_, __, context) =>
      process.env.NODE_ENV !== 'production' ? context : null,
  },
};

const typeDefs = [_baseTypes, DateTime, JsonType];
const resolvers = {
  ...globalResolvers,
  ...dateTimeResolvers,
  ...jsonResolvers,
};

module.exports = { typeDefs, resolvers };
