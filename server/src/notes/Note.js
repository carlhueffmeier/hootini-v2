const assert = require('assert');
const { none, isNil, isArray } = require('../utils/helpers');

const Note = {
  new(noteData) {
    const note = Note.create();
    note.init(noteData);
    return note;
  },

  create() {
    return Object.create(Note);
  },

  init(noteData) {
    assert(
      isValidInitParams(noteData),
      'Cannot initialize note: Invalid Arguments',
    );
    this.fields = noteData.fields;
    this.deckId = noteData.deckId;
    this.noteTypeId = noteData.noteTypeId;
  },
};

function isValidInitParams(noteData) {
  return (
    none(isNil, [noteData.deckId, noteData.noteTypeId]) &&
    isArray(noteData.fields)
  );
}

module.exports = Note;
