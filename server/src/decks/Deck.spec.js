const { aNewDeckProps } = require('./utils/testUtils');
const Deck = require('./deck');

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
