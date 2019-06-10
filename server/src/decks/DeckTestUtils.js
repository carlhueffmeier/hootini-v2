const Deck = require('./Deck');
const faker = require('faker');

function aDeck(customProps = {}) {
  return Deck.new(fakeNewDeckInput(customProps));
}

function aDeckId() {
  return faker.random.uuid();
}

function fakeNewDeckInput(customProps = {}) {
  return {
    name: faker.name.findName(),
    description: faker.lorem.sentences(),
    user: faker.random.number(),
    ...customProps,
  };
}

exports.aDeck = aDeck;
exports.aDeckId = aDeckId;
exports.fakeNewDeckInput = fakeNewDeckInput;
