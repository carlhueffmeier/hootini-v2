const gql = require('graphql-tag');

const typeDefs = gql`
  type NoteField {
    key: String!
    value: String
  }

  input NoteFieldCreateInput {
    key: String!
    value: String
  }

  input NoteFieldUpdateInput {
    key: String!
    value: String
  }
`;

module.exports = typeDefs;
