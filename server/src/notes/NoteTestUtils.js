const Note = require('./Note');
const faker = require('faker');
const { nTimes } = require('../utils/helpers');

function aNote(customProps = {}) {
  return Note.new(aNewNoteProps(customProps));
}

function aNoteId() {
  return faker.random.uuid();
}

function aNewNoteProps(customProps = {}) {
  return aNewNoteUserInput(customProps);
}

function aNewNoteUserInput(customProps = {}) {
  return {
    deckId: faker.random.uuid(),
    noteTypeId: faker.random.uuid(),
    fields: nNewNoteFieldInputs(),
    ...customProps,
  };
}

function nNewNoteFieldInputs(n = 1) {
  return nTimes(n, aNewNoteFieldInput);
}

function aNewNoteFieldInput() {
  return {
    key: faker.lorem.word(),
    value: faker.lorem.sentences(),
  };
}

exports.aNote = aNote;
exports.aNoteId = aNoteId;
exports.aNewNoteProps = aNewNoteProps;
exports.aNewNoteUserInput = aNewNoteUserInput;
