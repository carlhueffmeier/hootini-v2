const UserService = require('../users/service');
const DeckService = require('../decks/service');
const NoteService = require('../notes/service');
const { unpackToken } = require('../common/cryptoUtils');

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
