const DeckGateway = require('./DeckGateway');
const { aDeck } = require('./DeckTestUtils');

const A_USER_ID = 5;

describe('DeckGateway', () => {
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

  it('should find decks by user', async () => {
    const deck = aDeck({ user: A_USER_ID });
    await DeckGateway.save(deck);
    const foundDecks = await DeckGateway.findDecksByUserId(A_USER_ID);
    expect(foundDecks).toEqual([deck]);
  });
});
