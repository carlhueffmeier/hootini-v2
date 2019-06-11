const DeckGateway = require('./DeckGateway');
const Deck = require('./Deck');
const localEvents = require('../utils/localEvents');
const { DECK_CREATED } = require('./DeckEvents');

const DeckService = {
  new({ userId }) {
    const serviceInstance = Object.create(DeckService);
    serviceInstance.userId = userId;
    return serviceInstance;
  },

  async createDeck(createDeckInput) {
    const deck = Deck.new({ ...createDeckInput, userId: this.userId });
    const newDeck = await DeckGateway.save(deck);
    localEvents.publish(DECK_CREATED);

    return newDeck;
  },

  async getAllDecks() {
    return DeckGateway.findDecksByUserId(this.userId);
  },
};

module.exports = DeckService;
