const assert = require('assert');
const {
  calculatePasswordHash,
  compareToHash,
  generateToken,
} = require('../common/cryptoUtils');

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
    assert(
      this.password != undefined,
      'Cannot compare passwords: No password set',
    );
    return compareToHash(attempt, this.password);
  },

  async generateToken() {
    assert(
      this.id != undefined,
      'The user has to be persisted to generate a token.',
    );
    return generateToken(this.id);
  },
};

module.exports = User;
