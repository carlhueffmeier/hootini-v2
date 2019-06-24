const Note = require('./Note');
const uuid = require('uuid/v4');
const assert = require('assert');

var notesById = {};

const NoteGateway = {
  async save(note) {
    assert(Note.isPrototypeOf(note), 'note has to be of type `Note`');
    note.id = uuid();
    notesById[note.id] = note;
    return note;
  },

  async findNoteById(id) {
    return notesById[id];
  },

  async truncate() {
    notesById = {};
  },
};

module.exports = NoteGateway;
