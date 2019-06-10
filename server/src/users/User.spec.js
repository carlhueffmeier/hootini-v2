const User = require('./User');
const { fakeNewUserInput } = require('./UserTestUtils');

const userData = fakeNewUserInput();

describe('User', () => {
  it('can be created', () => {
    const user = User.create();
    expect(User.isPrototypeOf(user)).toBe(true);
  });

  it('can be initialized with new', async () => {
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
});
