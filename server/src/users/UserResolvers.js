const { AuthenticationError } = require('apollo-server-core');

const resolvers = {
  Query: {
    me: (_, __, { userId, userService }) => {
      return userService.findUserById(userId);
    },
  },

  Mutation: {
    signup: async (_, { data: userInfo }, { userService }) => {
      const user = await userService.createUser(userInfo);
      return authResponseFor(user);
    },

    signin: async (_, { data: credentials }, { userService }) => {
      try {
        const user = await userService.authenticate(credentials);
        return authResponseFor(user);
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },
  },
};

async function authResponseFor(user) {
  return {
    user,
    token: await user.generateToken(user),
  };
}

module.exports = resolvers;
