const Deck = require('./Deck');
const { aNewDeckProps } = require('./DeckTestUtils');

const deckData = aNewDeckProps();

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
