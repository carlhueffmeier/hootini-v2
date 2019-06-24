const UserService = require('../users/UserService');
const DeckService = require('../decks/DeckService');
const NoteService = require('../notes/NoteService');
const { unpackToken } = require('../utils/cryptoUtils');

async function createRequestContext({ authToken } = {}) {
  const userId = authToken ? await getUserId(authToken) : undefined;

  return {
    userId,
    userService: UserService,
    deckService: DeckService.new({ userId }),
    noteService: NoteService.new({ userId }),
  };
}

async function getUserId(authToken) {
  const payload = await unpackToken(authToken);
  return payload.userId;
}

exports.createRequestContext = createRequestContext;
