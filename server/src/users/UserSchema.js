const gql = require('graphql-tag');
const { AuthenticationError } = require('apollo-server-core');

const typeDefs = gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    signup(data: UserSignupInput!): UserAuthenticationResponse!
    signin(data: UserSigninInput!): UserAuthenticationResponse!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type SuccessMessage {
    message: String
  }

  type UserAuthenticationResponse {
    user: User!
    token: String!
  }

  input UserSignupInput {
    email: String!
    password: String!
    name: String!
  }

  input UserSigninInput {
    email: String!
    password: String!
  }
`;

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

module.exports = { typeDefs, resolvers };
