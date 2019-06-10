const cryptoUtils = require('./cryptoUtils');
const faker = require('faker');

const aPassword = faker.internet.password();
const invalidPassword = aPassword + '!';

describe('cryptoUtils', () => {
  it('original password should match generated hash', async () => {
    const hash = await cryptoUtils.calculatePasswordHash(aPassword);
    const isMatch = await cryptoUtils.compareToHash(aPassword, hash);
    expect(isMatch).toBe(true);
  });

  it("invalid password shouldn't match generated hash", async () => {
    const hash = await cryptoUtils.calculatePasswordHash(aPassword);
    const isMatch = await cryptoUtils.compareToHash(invalidPassword, hash);
    expect(isMatch).toBe(false);
  });
});
