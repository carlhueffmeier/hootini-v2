const UserSchema = require('./UserSchema');
const UserService = require('./UserService');
const { mountSchema } = require('../graphql/GraphQLTestUtils');
const gql = require('graphql-tag');
const { fakeNewUserInput } = require('./UserTestUtils');

const ME_QUERY = gql`
  query {
    me {
      id
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(data: { name: $name, email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(data: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

const userData = fakeNewUserInput();

describe('UserSchema', () => {
  var query;
  var mutate;
  var userId;

  beforeEach(() => {
    ({ query, mutate } = mountSchema(UserSchema, function context() {
      return { userId, UserService };
    }));
    userId = undefined;
  });

  describe('Queries', () => {
    it('me', async () => {
      const signupResponse = await signupUser(userData);
      userId = signupResponse.data.signup.user.id;
      const result = await query({
        query: ME_QUERY,
      });
      expect(result.data.me.id).toBe(userId);
    });
  });

  describe('Mutations', () => {
    it('signup', async () => {
      const result = await signupUser(userData);
      expect(result.data.signup.token).toBeDefined();
      expect(result.data.signup.user.id).toBeDefined();
    });

    it('signin', async () => {
      await signupUser(userData);
      const result = await mutate({
        query: SIGNIN_MUTATION,
        variables: { email: userData.email, password: userData.password },
      });
      expect(result.data.signin.token).toBeDefined();
      expect(result.data.signin.user.id).toBeDefined();
    });
  });

  function signupUser(userData) {
    return mutate({
      query: SIGNUP_MUTATION,
      variables: userData,
    });
  }
});
