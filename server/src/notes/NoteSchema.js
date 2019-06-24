const noteTypeDefs = require('./NoteTypeDefs');
const noteFieldTypeDefs = require('./NoteFieldTypeDefs');
const resolvers = require('./NoteResolvers');

module.exports = {
  typeDefs: [noteTypeDefs, noteFieldTypeDefs],
  resolvers,
};
