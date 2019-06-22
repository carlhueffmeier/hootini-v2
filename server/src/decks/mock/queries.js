const gql = require('graphql-tag');

const ALL_FIELDS = `
  id
  name
  slug
  description
  last_note_type
  cards_due
  cards_total
  last_review
  last_activity
  created_at
  updated_at`;

const DECK_QUERY_BY_ID = gql`
  query deck($id: ID!) {
    deck(where: { id: $id }) {
      ${ALL_FIELDS}
    }
  }
`;

const DECK_QUERY_BY_SLUG = gql`
  query deck($slug: String!) {
    deck(where: { slug: $slug }) {
      ${ALL_FIELDS}
    }
  }
`;

const ALL_DECKS_QUERY = gql`
  query allDecks {
    allDecks {
      ${ALL_FIELDS}
    }
  }
`;

const SEARCH_DECKS_BY_NAME_EQ_QUERY = gql`
  query allDecks($nameEquals: String!) {
    allDecks(where: { name: { eq: $nameEquals } }) {
      ${ALL_FIELDS}
    }
  }
`;

const SEARCH_DECKS_BY_NAME_CONTAINS_QUERY = gql`
  query allDecks($nameContains: String!) {
    allDecks(where: { name: { contains: $nameContains } }) {
      ${ALL_FIELDS}
    }
  }
`;

const CREATE_DECK_MUTATION = gql`
  mutation createDeck($name: String!, $description: String) {
    createDeck(data: { name: $name, description: $description }) {
      ${ALL_FIELDS}
    }
  }
`;

exports.ALL_DECKS_QUERY = ALL_DECKS_QUERY;
exports.DECK_QUERY_BY_ID = DECK_QUERY_BY_ID;
exports.DECK_QUERY_BY_SLUG = DECK_QUERY_BY_SLUG;
exports.SEARCH_DECKS_BY_NAME_EQ_QUERY = SEARCH_DECKS_BY_NAME_EQ_QUERY;
exports.SEARCH_DECKS_BY_NAME_CONTAINS_QUERY = SEARCH_DECKS_BY_NAME_CONTAINS_QUERY;
exports.CREATE_DECK_MUTATION = CREATE_DECK_MUTATION;
