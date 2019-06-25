const { mountSchemas } = require('../../graphql/utils/testUtils');
const { aNewDeckUserInput } = require('../utils/testUtils');
const DeckGateway = require('../gateway');
const DeckService = require('../service');
const DeckSchema = require('./schema');
const queries = require('./queries');

const deckData = aNewDeckUserInput();
const A_USER_ID = 5;

describe('DeckSchema', () => {
  var query, mutate;

  beforeEach(() => {
    DeckGateway.truncate();
    const deckService = DeckService.new({ userId: A_USER_ID });
    ({ query, mutate } = mountSchemas([DeckSchema], { deckService }));
  });

  describe('Queries', () => {
    describe('deck', () => {
      it('should find deck by id', async () => {
        const createDeckResponse = await createDeck(deckData);
        const { id, slug } = createDeckResponse.data.createDeck;

        const result = await query({
          query: queries.DECK_QUERY_BY_ID,
          variables: { id },
        });
        expect(result.data.deck.id).toBe(id);
        expect(result.data.deck.slug).toBe(slug);
      });

      it('should find deck by slug', async () => {
        const createDeckResponse = await createDeck(deckData);
        const { id, slug } = createDeckResponse.data.createDeck;

        const result = await query({
          query: queries.DECK_QUERY_BY_SLUG,
          variables: { slug },
        });
        expect(result.data.deck.id).toBe(id);
        expect(result.data.deck.slug).toBe(slug);
      });
    });

    describe('allDecks', () => {
      it('should return all decks for user', async () => {
        const deck1 = await createDeckWithName('deck1');
        const deck2 = await createDeckWithName('deck2');

        const result = await query({
          query: queries.ALL_DECKS_QUERY,
        });
        expect(result.data.allDecks).toEqual([deck1, deck2]);
      });

      it('should find decks by "equals" name search', async () => {
        const deck = await createDeckWithName('deck');
        await createDeckWithName('deck2');

        const result = await query({
          query: queries.SEARCH_DECKS_BY_NAME_EQ_QUERY,
          variables: { nameEquals: 'deck' },
        });
        expect(result.data.allDecks).toEqual([deck]);
      });

      it('should find decks by "contains" name search', async () => {
        const deck = await createDeckWithName('deck');
        const deck2 = await createDeckWithName('deck2');

        const result = await query({
          query: queries.SEARCH_DECKS_BY_NAME_CONTAINS_QUERY,
          variables: { nameContains: 'deck' },
        });
        expect(result.data.allDecks).toEqual([deck, deck2]);
      });

      async function createDeckWithName(name) {
        const createDeckInput = aNewDeckUserInput({ name });
        const createDeckResponse = await createDeck(createDeckInput);
        return createDeckResponse.data.createDeck;
      }
    });
  });

  describe('Mutations', () => {
    it('createDeck()', async () => {
      const result = await createDeck(deckData);
      expect(result.data.createDeck.id).toBeDefined();
      expect(result.data.createDeck.name).toBe(deckData.name);
    });
  });

  function createDeck(deckData) {
    return mutate({
      query: queries.CREATE_DECK_MUTATION,
      variables: deckData,
    });
  }
});
