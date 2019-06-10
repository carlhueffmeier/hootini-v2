const User = require('./User');
const uuid = require('uuid/v4');
const assert = require('assert');

const usersById = {};
const usersByEmail = {};

const UserGateway = {
  async save(user) {
    assert(User.isPrototypeOf(user), 'user has to be of type `User`');
    user.id = uuid();
    usersById[user.id] = user;
    usersByEmail[user.email] = user;
    return user;
  },

  async findUserByEmail(email) {
    return usersByEmail[email];
  },

  async findUserById(id) {
    return usersById[id];
  },
};

module.exports = UserGateway;
