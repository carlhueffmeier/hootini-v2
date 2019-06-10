const DeckService = require('./DeckService');
const localEvents = require('../utils/localEvents');
const { DECK_CREATED } = require('./DeckEvents');
const { fakeNewDeckInput } = require('./DeckTestUtils');

const A_USER_ID = 5;

describe('DeckService', () => {
  describe('createDeck()', () => {
    it('creates a new deck', async () => {
      const deck = await DeckService.createDeck(fakeNewDeckInput());
      expect(deck).toBeDefined();
    });

    it('creating a deck emits an event', async () => {
      const subscriber = jest.fn();
      localEvents.subscribe(DECK_CREATED, subscriber);
      await DeckService.createDeck(fakeNewDeckInput());
      expect(subscriber).toHaveBeenCalled();
    });
  });

  describe('getDecksForUser()', () => {
    it('returns all decks for user', async () => {
      const deck1 = await newDeckForUser('deck1');
      const deck2 = await newDeckForUser('deck2');
      const result = await DeckService.getDecksForUser(A_USER_ID);
      expect(result).toEqual([deck1, deck2]);
    });
  });

  function newDeckForUser(name) {
    return DeckService.createDeck({
      name,
      user: A_USER_ID,
    });
  }
});
