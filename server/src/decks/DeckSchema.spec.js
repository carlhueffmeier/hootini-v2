const DeckSchema = require('./DeckSchema');
const DeckService = require('./DeckService');
const { mountSchema } = require('../graphql/GraphQLTestUtils');
const { aNewDeckUserInput } = require('./DeckTestUtils');
const queries = require('./mock/queries');

const deckData = aNewDeckUserInput();
const A_USER_ID = 5;

describe('DeckSchema', () => {
  var mutate;

  beforeEach(() => {
    const deckService = DeckService.new({ userId: A_USER_ID });
    ({ mutate } = mountSchema(DeckSchema, { deckService }));
  });

  describe('Queries', () => {
    it('deck', async () => {});

    it('allDecks', async () => {});
  });

  describe('Mutations', () => {
    it('createDeck', async () => {
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
