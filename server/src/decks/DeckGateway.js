const Deck = require('./Deck');
const uuid = require('uuid/v4');
const assert = require('assert');
const { escapeRegExp } = require('../utils/helpers');

var decksById = {};
var decksByUserId = {};
var decksBySlug = {};

const DeckGateway = {
  async save(deck) {
    assert(Deck.isPrototypeOf(deck), 'Cannot save deck: Incorrect type');
    deck.id = uuid();
    decksById[deck.id] = deck;
    decksBySlug[deck.slug] = deck;
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

  async findDeckByUserIdAndId(userId, id) {
    const deck = decksById[id];
    if (deck && isAllowedToView(userId, deck)) {
      return deck;
    }
  },

  async findDeckByUserIdAndSlug(userId, slug) {
    const deck = decksBySlug[slug];
    if (deck && isAllowedToView(userId, deck)) {
      return deck;
    }
  },

  async findDecksByUserId(userId) {
    const results = decksByUserId[userId];
    if (!results) {
      return [];
    }
    return results;
  },

  async findDecksByUserIdAndName(userId, name) {
    const escapedName = escapeRegExp(name);
    const nameRegExp = new RegExp(escapedName, 'i');
    const results = await this.findDecksByUserId(userId);
    return results.filter(deck => nameRegExp.test(deck.name));
  },

  async findDecksByUserIdAndNameExact(userId, name) {
    const escapedName = escapeRegExp(name);
    const nameRegExp = new RegExp('^' + escapedName + '$');
    const results = await this.findDecksByUserId(userId);
    return results.filter(deck => nameRegExp.test(deck.name));
  },

  async truncate() {
    decksById = {};
    decksByUserId = {};
    decksBySlug = {};
  },
};

function isAllowedToView(userId, deck) {
  return deck.userId === userId;
}

module.exports = DeckGateway;
