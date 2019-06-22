const gql = require('graphql-tag');

const typeDefs = gql`
  extend type Query {
    deck(where: DeckWhereUniqueInput): Deck
    allDecks(where: DeckWhereInput): [Deck]!
  }

  extend type Mutation {
    createDeck(data: DeckCreateInput!): Deck!
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
`;

const resolvers = {
  Query: {
    deck: (_, { where }, { deckService }) => {
      if (where.id) {
        return deckService.findDeckById(where.id);
      } else if (where.slug) {
        return deckService.findDeckBySlug(where.slug);
      }
    },
    allDecks: (_, { where }, { deckService }) => {
      if (where && where.name && where.name.eq) {
        return deckService.findDecksByNameExact(where.name.eq);
      }
      if (where && where.name && where.name.contains) {
        return deckService.findDecksByName(where.name.contains);
      }
      return deckService.getAllDecks();
    },
  },
  Mutation: {
    createDeck: (_, { data }, { deckService }) => {
      return deckService.createDeck(data);
    },
  },
};

module.exports = { typeDefs, resolvers };
