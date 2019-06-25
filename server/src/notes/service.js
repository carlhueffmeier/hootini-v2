const NoteGateway = require('./gateway');
const Note = require('./note');

const NoteService = {
  new({ userId }) {
    const serviceInstance = Object.create(NoteService);
    serviceInstance.userId = userId;
    return serviceInstance;
  },

  async createNote(createNoteInput) {
    // TODO: Check whether deck belongs to user
    const note = Note.new(createNoteInput);
    const newNote = await NoteGateway.save(note);

    return newNote;
  },

  async findNoteById(id) {
    return NoteGateway.findNoteById(id);
  },
};

module.exports = NoteService;
