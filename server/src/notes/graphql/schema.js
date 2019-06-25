const noteTypeDefs = require('./noteTypeDefs');
const noteFieldTypeDefs = require('./noteFieldTypeDefs');
const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [noteTypeDefs, noteFieldTypeDefs],
  resolvers,
};
