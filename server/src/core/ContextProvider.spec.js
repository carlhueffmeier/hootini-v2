const { createRequestContext } = require('./contextProvider');
const { generateToken } = require('../common/cryptoUtils');

const A_USER_ID = 42;

describe('ContextProvider', () => {
  it('given empty authToken, no userId in context', async () => {
    const context = await createRequestContext();
    expect(context.userId).toBeUndefined();
  });

  it('given valid authToken, context contains userId', async () => {
    const authToken = await generateToken(A_USER_ID);
    const context = await createRequestContext({ authToken });
    expect(context).toHaveProperty('userId', A_USER_ID);
  });
});
