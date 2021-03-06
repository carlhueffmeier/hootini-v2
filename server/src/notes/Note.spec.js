const Note = require('./note');
const { aNewNoteProps } = require('./utils/testUtils');
const { omit } = require('../common/helpers');

const noteData = aNewNoteProps();

describe('Note', () => {
  it('can be created', () => {
    const note = Note.create();
    expect(Note.isPrototypeOf(note)).toBe(true);
  });

  it('can be initialized with new', () => {
    const note = Note.new(noteData);
    expect(note.name).toEqual(noteData.name);
  });

  it('should throw error if require parameters are not provided', () => {
    expect(() => Note.new(omit(['deckId'], noteData))).toThrow();
    expect(() => Note.new(omit(['noteTypeId'], noteData))).toThrow();
  });
});
