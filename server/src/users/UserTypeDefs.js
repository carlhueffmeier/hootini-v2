const gql = require('graphql-tag');

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

module.exports = typeDefs;
