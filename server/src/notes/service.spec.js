const NoteService = require('./service');
const NoteGateway = require('./gateway');
const { aNewNoteUserInput } = require('./utils/testUtils');

const A_USER_ID = 1;

describe('NoteService', () => {
  var service;

  beforeEach(() => {
    NoteGateway.truncate();
    service = aService();
  });

  describe('createNote()', () => {
    it('creates a new note', async () => {
      const note = await service.createNote(aNewNoteUserInput());
      expect(note).toBeDefined();
    });
  });

  describe('findNoteById()', () => {
    it('returns note', async () => {
      const createdNote = await service.createNote(aNewNoteUserInput());
      const foundNote = await service.findNoteById(createdNote.id);
      expect(foundNote).toBe(createdNote);
    });
  });

  function aService() {
    return NoteService.new({ userId: A_USER_ID });
  }
});
