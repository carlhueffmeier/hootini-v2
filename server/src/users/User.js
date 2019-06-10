const assert = require('assert');
const {
  calculatePasswordHash,
  compareToHash,
} = require('../utils/cryptoUtils');

const User = {
  async new(userData) {
    const user = User.create();
    await user.init(userData);
    return user;
  },

  create() {
    return Object.create(User);
  },

  async init(userData) {
    this.name = userData.name;
    this.email = userData.email;
    this.password = await calculatePasswordHash(userData.password);
  },

  async isPasswordCorrect(attempt) {
    assert(this.password != undefined, 'no password set');
    return compareToHash(attempt, this.password);
  },
};

module.exports = User;
