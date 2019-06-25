const { unpackToken } = require('../common/cryptoUtils');
const { aNewUserProps, aUser } = require('./utils/testUtils');
const User = require('./user');
const UserGateway = require('./gateway');

const userData = aNewUserProps();

describe('User', () => {
  it('create()', () => {
    const user = User.create();
    expect(User.isPrototypeOf(user)).toBe(true);
  });

  it('new()', async () => {
    const user = await User.new(userData);
    expect(user.name).toEqual(userData.name);
    expect(user.email).toEqual(userData.email);
    expect(user.password).toBeDefined();
  });

  it('should not store passwords as plain text', async () => {
    const user = await User.new(userData);
    expect(user.password).not.toEqual(userData.password);
  });

  describe('isPasswordCorrect()', () => {
    var user;

    beforeEach(async () => {
      user = await User.new(userData);
    });

    it('given correct password, returns true', async () => {
      const isCorrect = await user.isPasswordCorrect(userData.password);
      expect(isCorrect).toBe(true);
    });

    it('given incorrect password, returns false', async () => {
      const isCorrect = await user.isPasswordCorrect('incorrect');
      expect(isCorrect).toBe(false);
    });
  });

  it('generateToken()', async () => {
    const user = await aUser();
    await UserGateway.save(user);
    const token = await user.generateToken();
    const unpackedToken = await unpackToken(token);

    expect(unpackedToken.userId).toBe(user.id);
  });
});
