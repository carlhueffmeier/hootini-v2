const gql = require('graphql-tag');

const typeDefs = gql`
  type Note {
    id: ID!
    fields: [NoteField]
    updatedAt: DateTime
    createdAt: DateTime
  }

  type NoteCreateResult {
    note: Note!
    cardsAdded: Int!
  }

  input NoteWhereUniqueInput {
    id: ID!
  }

  input NoteCreateInput {
    deckId: ID!
    noteTypeId: ID!
    fields: [NoteFieldCreateInput!]!
  }

  extend type Query {
    note(where: NoteWhereUniqueInput!): Note!
  }

  extend type Mutation {
    createNote(data: NoteCreateInput!): NoteCreateResult!
  }
`;

module.exports = typeDefs;
