const Deck = require('./Deck');
const uuid = require('uuid/v4');
const assert = require('assert');

var decksById = {};
var decksByUserId = {};

const DeckGateway = {
  async save(deck) {
    assert(Deck.isPrototypeOf(deck), 'Cannot save deck: Incorrect type');
    deck.id = uuid();
    decksById[deck.id] = deck;
    if (decksByUserId[deck.userId]) {
      decksByUserId[deck.userId].push(deck);
    } else {
      decksByUserId[deck.userId] = [deck];
    }
    return deck;
  },

  async findDeckById(id) {
    return decksById[id];
  },

  async findDecksByUserId(userId) {
    return decksByUserId[userId];
  },

  async truncate() {
    decksById = {};
    decksByUserId = {};
  },
};

module.exports = DeckGateway;
