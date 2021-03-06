const localEvents = require('../common/localEvents');
const UserGateway = require('./gateway');
const User = require('./user');
const { USER_CREATED } = require('./events');
const { AuthenticationError } = require('./errors');

const UserService = {
  async createUser(createUserInput) {
    const user = await User.new(createUserInput);
    const newUser = await UserGateway.save(user);
    localEvents.publish(USER_CREATED);
    return newUser;
  },

  async findUserById(userId) {
    return UserGateway.findUserById(userId);
  },

  async findUserByEmail(email) {
    return UserGateway.findUserByEmail(email);
  },

  async authenticate(credentials) {
    const user = await UserGateway.findUserByEmail(credentials.email);
    if (!user) {
      throw new AuthenticationError('User Not Found');
    }
    await validateUserPassword(user, credentials.password);

    return user;
  },
};

async function validateUserPassword(user, password) {
  if ((await user.isPasswordCorrect(password)) === false) {
    throw new AuthenticationError('Incorrect Password');
  }
}

module.exports = UserService;
