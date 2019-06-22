const DeckSchema = require('./DeckSchema');
const DeckService = require('./DeckService');
const { mountSchema } = require('../graphql/GraphQLTestUtils');
const { aNewDeckUserInput } = require('./DeckTestUtils');
const queries = require('./mock/queries');

const deckData = aNewDeckUserInput();
const A_USER_ID = 5;

describe('DeckSchema', () => {
  var query, mutate;

  beforeEach(() => {
    const deckService = DeckService.new({ userId: A_USER_ID });
    ({ query, mutate } = mountSchema(DeckSchema, { deckService }));
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

    it('allDecks', async () => {});
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
