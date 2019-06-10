const Deck = require('./Deck');
const { fakeNewDeckInput } = require('./DeckTestUtils');

const deckData = fakeNewDeckInput();

describe('Deck', () => {
  it('can be created', () => {
    const deck = Deck.create();
    expect(Deck.isPrototypeOf(deck)).toBe(true);
  });

  it('can be initialized with new', () => {
    const deck = Deck.new(deckData);
    expect(deck.name).toEqual(deckData.name);
  });
});
