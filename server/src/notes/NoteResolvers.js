const resolvers = {
  Query: {
    note: async (_, { where }, { noteService }) => {
      return noteService.findNoteById(where.id);
    },
  },
  Mutation: {
    createNote: async (_, { data }, { noteService }) => {
      const note = await noteService.createNote(data);
      return {
        note,
        cardsAdded: 0,
      };
    },
  },
};

module.exports = resolvers;
