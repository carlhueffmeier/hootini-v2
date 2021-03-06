const localEvents = require('../common/localEvents');
const { aNewUserProps, aUser } = require('./utils/testUtils');
const UserService = require('./service');
const UserGateway = require('./gateway');
const { USER_CREATED } = require('./events');
const { AuthenticationError } = require('./errors');

const userData = aNewUserProps();
const fakeCredentials = {
  email: userData.email,
  password: userData.password,
};

describe('UserService', () => {
  beforeEach(async () => {
    await UserGateway.truncate();
  });

  describe('createUser()', () => {
    it('creates a new user', async () => {
      const user = await UserService.createUser(aNewUserProps());
      expect(user).toBeDefined();
    });

    it('creating a user emits an event', async () => {
      const subscriber = jest.fn();
      localEvents.subscribe(USER_CREATED, subscriber);
      await UserService.createUser(aNewUserProps());
      expect(subscriber).toHaveBeenCalled();
    });
  });

  it('should find users by email', async () => {
    const user = await aUser();
    await UserGateway.save(user);
    const foundUser = await UserService.findUserByEmail(user.email);
    expect(user).toBe(foundUser);
  });

  it('should find users by id', async () => {
    const user = await aUser();
    await UserGateway.save(user);
    const foundUser = await UserService.findUserById(user.id);
    expect(user).toBe(foundUser);
  });

  describe('authenticate()', () => {
    it('should authenticate existing users', async () => {
      const user = await UserService.createUser(userData);
      const authenticatedUser = await UserService.authenticate(fakeCredentials);
      expect(authenticatedUser).toBe(user);
    });

    it('should always return the same user for given credentials', async () => {
      await UserService.createUser(userData);
      const firstUser = await UserService.authenticate(fakeCredentials);
      const secondUser = await UserService.authenticate(fakeCredentials);
      expect(firstUser).toBe(secondUser);
    });

    it('should throw exception if user does not exist', async () => {
      try {
        await UserService.authenticate(fakeCredentials);
      } catch (error) {
        expect(error).toBeInstanceOf(AuthenticationError);
      }
    });
  });
});
