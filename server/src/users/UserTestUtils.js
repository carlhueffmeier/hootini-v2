const User = require('./User');
const faker = require('faker');

// Users

function aUser() {
  return User.new(fakeNewUserInput());
}

function aUserId() {
  return faker.random.uuid();
}

function fakeNewUserInput() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

exports.aUser = aUser;
exports.aUserId = aUserId;
exports.fakeNewUserInput = fakeNewUserInput;
