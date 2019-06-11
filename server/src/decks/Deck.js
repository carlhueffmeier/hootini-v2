const assert = require('assert');
const { none, isNil } = require('../utils/helpers');

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
    this.name = deckData.name;
    this.userId = deckData.userId;
    this.description = deckData.description;
  },
};

module.exports = Deck;
