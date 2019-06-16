const assert = require('assert');
const { none, isNil, generateSlug } = require('../utils/helpers');

const Deck = {
  new(deckData) {
    const deck = Deck.create();
    deck.init(deckData);
    return deck;
  },

  create() {
    return Object.create(Deck);
  },

  init(deckData) {
    assert(
      none(isNil, [deckData.name, deckData.userId]),
      'Cannot initialize deck: Invalid Arguments',
    );
    this.userId = deckData.userId;
    this.name = deckData.name;
    this.slug = generateSlug(deckData.name);
    this.description = deckData.description;
  },
};

module.exports = Deck;
