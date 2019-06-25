const UserGateway = require('./gateway');
const { aUser } = require('./utils/testUtils');

describe('UserGateway', () => {
  it('should set the id on saved instances', async () => {
    const user = await aUser();
    expect(user.id).toBeUndefined();
    await UserGateway.save(user);
    expect(user.id).toBeDefined();
  });

  it('should find users by email', async () => {
    const user = await aUser();
    await UserGateway.save(user);
    const foundUser = await UserGateway.findUserByEmail(user.email);
    expect(user).toBe(foundUser);
  });

  it('should find users by id', async () => {
    const user = await aUser();
    await UserGateway.save(user);
    const foundUser = await UserGateway.findUserById(user.id);
    expect(user).toBe(foundUser);
  });
});
