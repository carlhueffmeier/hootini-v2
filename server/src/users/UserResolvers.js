const { AuthenticationError } = require('apollo-server-core');

const resolvers = {
  Query: {
    me: (_, __, { userId, UserService }) => {
      return UserService.findUserById(userId);
    },
  },

  Mutation: {
    signup: async (_, { data: userInfo }, { UserService }) => {
      const user = await UserService.createUser(userInfo);
      return authResponseFor(user);
    },

    signin: async (_, { data: credentials }, { UserService }) => {
      try {
        const user = await UserService.authenticate(credentials);
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
