const gql = require('graphql-tag');

const ALL_FIELDS = `
  id
  fields {
    key
    value
  }
  createdAt
  updatedAt`;

const NOTE_QUERY_BY_ID = gql`
  query note($id: ID!) {
    note(where: { id: $id }) {
      ${ALL_FIELDS}
    }
  }
`;

const CREATE_NOTE_MUTATION = gql`
  mutation createNote(
    $noteTypeId: ID!
    $deckId: ID!
    $fields: [NoteFieldCreateInput!]!
  ) {
    createNote(
      data: { noteTypeId: $noteTypeId, deckId: $deckId, fields: $fields }
    ) {
      note {
        ${ALL_FIELDS}
      }
      cardsAdded
    }
  }
`;

exports.NOTE_QUERY_BY_ID = NOTE_QUERY_BY_ID;
exports.CREATE_NOTE_MUTATION = CREATE_NOTE_MUTATION;
