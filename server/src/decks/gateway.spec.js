const { aDeck } = require('./utils/testUtils');
const DeckGateway = require('./gateway');

const A_USER_ID = 5;
const ANOTHER_USER_ID = 10;
const A_DECK_ID = 15;
const A_SLUG = 'spanish-101';

describe('DeckGateway', () => {
  beforeEach(() => {
    DeckGateway.truncate();
  });

  it('should set the id on saved instances', async () => {
    const deck = aDeck();
    expect(deck.id).toBeUndefined();
    await DeckGateway.save(deck);
    expect(deck.id).toBeDefined();
  });

  it('should find decks by id', async () => {
    const deck = aDeck();
    await DeckGateway.save(deck);
    const foundDeck = await DeckGateway.findDeckById(deck.id);
    expect(foundDeck).toBe(deck);
  });

  describe('findDeckByUserIdAndId()', () => {
    it('should find decks for userId', async () => {
      const deck = aDeck({ userId: A_USER_ID });
      await DeckGateway.save(deck);
      const foundDeck = await DeckGateway.findDeckByUserIdAndId(
        A_USER_ID,
        deck.id,
      );
      expect(foundDeck).toBe(deck);
    });

    it('should return undefined for nonexistant decks', async () => {
      const foundDeck = await DeckGateway.findDeckByUserIdAndId(
        A_USER_ID,
        A_DECK_ID,
      );
      expect(foundDeck).toBeUndefined();
    });

    it('should not return decks belonging to other users', async () => {
      const deck = aDeck({ userId: A_USER_ID });
      await DeckGateway.save(deck);
      const foundDeck = await DeckGateway.findDeckByUserIdAndId(
        ANOTHER_USER_ID,
        deck.id,
      );
      expect(foundDeck).toBeUndefined();
    });
  });

  describe('findDeckByUserIdAndSlug()', () => {
    it('should find decks for userId', async () => {
      const deck = aDeck({ userId: A_USER_ID });
      await DeckGateway.save(deck);
      const foundDeck = await DeckGateway.findDeckByUserIdAndSlug(
        A_USER_ID,
        deck.slug,
      );
      expect(foundDeck).toBe(deck);
    });

    it('should return undefined for nonexistant decks', async () => {
      const foundDeck = await DeckGateway.findDeckByUserIdAndSlug(
        A_USER_ID,
        A_SLUG,
      );
      expect(foundDeck).toBeUndefined();
    });

    it('should not return decks belonging to other users', async () => {
      const deck = aDeck({ userId: A_USER_ID });
      await DeckGateway.save(deck);
      const foundDeck = await DeckGateway.findDeckByUserIdAndSlug(
        ANOTHER_USER_ID,
        deck.slug,
      );
      expect(foundDeck).toBeUndefined();
    });
  });

  describe('findDecksByUserIdAndName()', () => {
    it('should find decks by name', async () => {
      const deck = aDeck({ userId: A_USER_ID, name: 'deck123' });
      await DeckGateway.save(deck);
      const result = await DeckGateway.findDecksByUserIdAndName(
        A_USER_ID,
        'deck',
      );
      expect(result).toEqual([deck]);
    });

    it('should return undefined for nonexistant decks', async () => {
      const foundDeck = await DeckGateway.findDecksByUserIdAndName(
        A_USER_ID,
        'deckThatDoesNotExist',
      );
      expect(foundDeck).toEqual([]);
    });

    it('should not return decks belonging to other users', async () => {
      const deck = aDeck({ userId: A_USER_ID });
      await DeckGateway.save(deck);
      const foundDeck = await DeckGateway.findDecksByUserIdAndName(
        ANOTHER_USER_ID,
        deck.name,
      );
      expect(foundDeck).toEqual([]);
    });
  });

  describe('findDecksByUserIdAndNameExact()', () => {
    it('should find decks by name', async () => {
      const deck = aDeck({ userId: A_USER_ID, name: 'deck123' });
      await DeckGateway.save(deck);
      const result = await DeckGateway.findDecksByUserIdAndNameExact(
        A_USER_ID,
        'deck123',
      );
      expect(result).toEqual([deck]);
    });

    it('should return undefined for nonexistant decks', async () => {
      const deck = aDeck({ userId: A_USER_ID, name: 'deck123' });
      await DeckGateway.save(deck);
      const results = await DeckGateway.findDecksByUserIdAndNameExact(
        A_USER_ID,
        'deck',
      );
      expect(results).toEqual([]);
    });

    it('should not return decks belonging to other users', async () => {
      const deck = aDeck({ userId: A_USER_ID });
      await DeckGateway.save(deck);
      const results = await DeckGateway.findDecksByUserIdAndNameExact(
        ANOTHER_USER_ID,
        deck.name,
      );
      expect(results).toEqual([]);
    });
  });
});
