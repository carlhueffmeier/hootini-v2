const gql = require('graphql-tag');

const typeDefs = gql`
  type Deck {
    id: ID!
    name: String!
    slug: String!
    description: String
    lastNoteType: Int
    cardsDue: Int
    cardsTotal: Int
    lastReview: DateTime
    lastActivity: DateTime
    createdAt: DateTime
    updatedAt: DateTime
  }

  input DeckCreateInput {
    name: String!
    description: String
  }

  input DeckWhereUniqueInput {
    id: ID
    slug: String
  }

  input DeckWhereInput {
    name: StringCriterium!
  }

  input StringCriterium {
    eq: String
    contains: String
  }

  extend type Query {
    deck(where: DeckWhereUniqueInput): Deck
    allDecks(where: DeckWhereInput): [Deck]!
  }

  extend type Mutation {
    createDeck(data: DeckCreateInput!): Deck!
  }

  # extend type Note {
  #   deck: Deck!
  # }
`;

module.exports = typeDefs;
