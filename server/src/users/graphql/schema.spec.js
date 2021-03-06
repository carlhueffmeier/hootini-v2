const { mountSchemas } = require('../../graphql/utils/testUtils');
const { aNewUserProps } = require('../utils/testUtils');
const UserService = require('../service');
const UserSchema = require('./schema');
const queries = require('./queries');

const userData = aNewUserProps();

describe('UserSchema', () => {
  var query;
  var mutate;
  var userId;

  beforeEach(() => {
    ({ query, mutate } = mountSchemas([UserSchema], function context() {
      return { userId, userService: UserService };
    }));
    userId = undefined;
  });

  describe('Queries', () => {
    it('me', async () => {
      const signupResponse = await signupUser(userData);
      userId = signupResponse.data.signup.user.id;
      const result = await query({
        query: queries.ME_QUERY,
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
        query: queries.SIGNIN_MUTATION,
        variables: { email: userData.email, password: userData.password },
      });
      expect(result.data.signin.token).toBeDefined();
      expect(result.data.signin.user.id).toBeDefined();
    });
  });

  function signupUser(userData) {
    return mutate({
      query: queries.SIGNUP_MUTATION,
      variables: userData,
    });
  }
});
