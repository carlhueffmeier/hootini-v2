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

module.exports = resolvers;
