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

  async findDeckById(id) {
    return DeckGateway.findDeckByUserIdAndId(this.userId, id);
  },

  async findDeckBySlug(slug) {
    return DeckGateway.findDeckByUserIdAndSlug(this.userId, slug);
  },

  async findDecksByName(name) {
    return DeckGateway.findDecksByUserIdAndName(this.userId, name);
  },

  async findDecksByNameExact(name) {
    return DeckGateway.findDecksByUserIdAndNameExact(this.userId, name);
  },
};

module.exports = DeckService;
