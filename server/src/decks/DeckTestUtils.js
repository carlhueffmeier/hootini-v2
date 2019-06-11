const Deck = require('./Deck');
const faker = require('faker');

function aDeck(customProps = {}) {
  return Deck.new(aNewDeckProps(customProps));
}

function aDeckId() {
  return faker.random.uuid();
}

function aNewDeckProps(customProps = {}) {
  return {
    name: faker.name.findName(),
    description: faker.lorem.sentences(),
    userId: faker.random.number(),
    ...customProps,
  };
}

function aNewDeckUserInput(customProps = {}) {
  return {
    name: faker.name.findName(),
    description: faker.lorem.sentences(),
    ...customProps,
  };
}

exports.aDeck = aDeck;
exports.aDeckId = aDeckId;
exports.aNewDeckProps = aNewDeckProps;
exports.aNewDeckUserInput = aNewDeckUserInput;
