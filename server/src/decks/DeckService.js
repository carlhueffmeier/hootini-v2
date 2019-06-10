const DeckGateway = require('./DeckGateway');
const Deck = require('./Deck');
const localEvents = require('../utils/localEvents');
const { DECK_CREATED } = require('./DeckEvents');

const DeckService = {
  async createDeck(createDeckInput) {
    const deck = Deck.new(createDeckInput);
    const newDeck = await DeckGateway.save(deck);
    localEvents.publish(DECK_CREATED);

    return newDeck;
  },
  async getDecksForUser(userId) {
    return DeckGateway.findDecksByUserId(userId);
  },
};

module.exports = DeckService;
