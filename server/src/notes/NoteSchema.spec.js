const NoteSchema = require('./NoteSchema');
const NoteGateway = require('./NoteGateway');
const NoteService = require('./NoteService');
const { mountSchemas } = require('../graphql/GraphQLTestUtils');
const { aNewNoteUserInput } = require('./NoteTestUtils');
const queries = require('./mock/queries');

const noteData = aNewNoteUserInput();
const A_USER_ID = 5;

describe('NoteSchema', () => {
  var query, mutate;

  beforeEach(() => {
    NoteGateway.truncate();
    const noteService = NoteService.new({ userId: A_USER_ID });
    ({ query, mutate } = mountSchemas([NoteSchema], { noteService }));
  });

  describe('Queries', () => {
    describe('note', () => {
      it('should find note by id', async () => {
        const createNoteResponse = await createNote(noteData);
        const createdNote = createNoteResponse.data.createNote.note;

        const result = await query({
          query: queries.NOTE_QUERY_BY_ID,
          variables: { id: createdNote.id },
        });
        expect(result.data.note.id).toBe(createdNote.id);
      });
    });
  });

  describe('Mutations', () => {
    it('createNote()', async () => {
      const result = await createNote(noteData);
      expect(result.data.createNote.cardsAdded).toBeDefined();
      expect(result.data.createNote.note.id).toBeDefined();
    });
  });

  function createNote(noteData) {
    return mutate({
      query: queries.CREATE_NOTE_MUTATION,
      variables: noteData,
    });
  }
});
