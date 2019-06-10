const Deck = require('./Deck');
const uuid = require('uuid/v4');
const assert = require('assert');

const decksById = {};
const decksByUser = {};

const DeckGateway = {
  async save(deck) {
    assert(Deck.isPrototypeOf(deck), 'Cannot save deck: Incorrect type');
    deck.id = uuid();
    decksById[deck.id] = deck;
    if (decksByUser[deck.user]) {
      decksByUser[deck.user].push(deck);
    } else {
      decksByUser[deck.user] = [deck];
    }
    return deck;
  },

  async findDeckById(id) {
    return decksById[id];
  },

  async findDecksByUserId(userId) {
    return decksByUser[userId];
  },
};

module.exports = DeckGateway;
