const User = require('../user');
const faker = require('faker');

// Users

function aUser() {
  return User.new(aNewUserProps());
}

function aUserId() {
  return faker.random.uuid();
}

function aNewUserProps() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

exports.aUser = aUser;
exports.aUserId = aUserId;
exports.aNewUserProps = aNewUserProps;
