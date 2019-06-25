const NoteGateway = require('./gateway');
const { aNote } = require('./utils/testUtils');

describe('NoteGateway', () => {
  it('should set the id on saved instances', async () => {
    const note = await aNote();
    expect(note.id).toBeUndefined();
    await NoteGateway.save(note);
    expect(note.id).toBeDefined();
  });

  it('should find notes by id', async () => {
    const note = await aNote();
    await NoteGateway.save(note);
    const foundNote = await NoteGateway.findNoteById(note.id);
    expect(note).toBe(foundNote);
  });
});
