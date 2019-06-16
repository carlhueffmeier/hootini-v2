const gql = require('graphql-tag');

const typeDefs = gql`
  extend type Query {
    deck(where: DeckWhereUniqueInput): Deck!
    allDecks(where: DeckWhereInput): [Deck]!
  }

  extend type Mutation {
    createDeck(data: DeckCreateInput!): Deck!
    updateDeck(where: DeckWhereUniqueInput!, data: DeckUpdateInput!): Deck!
  }

  type Deck {
    id: ID!
    name: String!
    slug: String!
    description: String
    last_note_type: Int
    cards_due: Int
    cards_total: Int
    last_review: DateTime
    last_activity: DateTime
    created_at: DateTime
    updated_at: DateTime
  }

  input DeckCreateInput {
    name: String!
    description: String
  }

  input DeckUpdateInput {
    name: String
    description: String
  }

  input DeckWhereUniqueInput {
    id: ID
    slug: String
  }

  input DeckWhereInput {
    name: String
  }
`;

const resolvers = {
  Mutation: {
    createDeck: (_, { data }, { deckService }) => {
      return deckService.createDeck(data);
    },
  },
};

module.exports = { typeDefs, resolvers };
