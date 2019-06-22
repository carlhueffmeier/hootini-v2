const DeckService = require('./DeckService');
const DeckGateway = require('./DeckGateway');
const localEvents = require('../utils/localEvents');
const { DECK_CREATED } = require('./DeckEvents');
const { aNewDeckUserInput } = require('./DeckTestUtils');

const USER_ID_BOB = 1;
const USER_ID_MICAH = 2;

describe('DeckService', () => {
  beforeEach(() => {
    DeckGateway.truncate();
  });

  it('can be instantiated', () => {
    aServiceForUser(USER_ID_BOB);
  });

  describe('createDeck()', () => {
    var service;

    beforeEach(() => {
      service = aServiceForUser(USER_ID_BOB);
    });

    it('creates a new deck', async () => {
      const deck = await service.createDeck(aNewDeckUserInput());
      expect(deck).toBeDefined();
    });

    it('created decks have the correct userId', async () => {
      const deck = await service.createDeck(aNewDeckUserInput());
      expect(deck.userId).toBe(USER_ID_BOB);
    });

    it('creating a deck emits an event', async () => {
      const subscriber = jest.fn();
      localEvents.subscribe(DECK_CREATED, subscriber);
      await service.createDeck(aNewDeckUserInput());
      expect(subscriber).toHaveBeenCalled();
    });
  });

  describe('getAllDecks()', () => {
    it('returns only decks for current user', async () => {
      const serviceOfBob = aServiceForUser(USER_ID_BOB);
      const serviceOfMicah = aServiceForUser(USER_ID_MICAH);
      const deck1 = await serviceOfBob.createDeck({ name: 'deck1' });
      const deck2 = await serviceOfBob.createDeck({ name: 'deck2' });
      const deck3 = await serviceOfMicah.createDeck({ name: 'deck3' });

      expect(await serviceOfBob.getAllDecks()).toEqual([deck1, deck2]);
      expect(await serviceOfMicah.getAllDecks()).toEqual([deck3]);
    });
  });

  describe('findDeckById()', () => {
    it('returns deck', async () => {
      const serviceOfMicah = aServiceForUser(USER_ID_MICAH);
      const micahsDeck = await serviceOfMicah.createDeck({
        name: 'micahsDeck',
      });

      expect(await serviceOfMicah.findDeckById(micahsDeck.id)).toBe(micahsDeck);
    });

    it('returns only decks for current user', async () => {
      const serviceOfBob = aServiceForUser(USER_ID_BOB);
      const serviceOfMicah = aServiceForUser(USER_ID_MICAH);
      const micahsDeck = await serviceOfMicah.createDeck({
        name: 'micahsDeck',
      });

      expect(await serviceOfBob.findDeckById(micahsDeck.id)).toBeUndefined();
    });
  });

  describe('findDeckBySlug()', () => {
    it('returns deck', async () => {
      const serviceOfMicah = aServiceForUser(USER_ID_MICAH);
      const micahsDeck = await serviceOfMicah.createDeck({
        name: 'micahsDeck',
      });

      const result = await serviceOfMicah.findDeckBySlug(micahsDeck.slug);
      expect(result).toBe(micahsDeck);
    });

    it('returns only decks for current user', async () => {
      const serviceOfBob = aServiceForUser(USER_ID_BOB);
      const serviceOfMicah = aServiceForUser(USER_ID_MICAH);
      const micahsDeck = await serviceOfMicah.createDeck({
        name: 'micahsDeck',
      });

      const result = await serviceOfBob.findDeckBySlug(micahsDeck.slug);
      expect(result).toBeUndefined();
    });
  });

  function aServiceForUser(userId) {
    return DeckService.new({ userId });
  }
});
