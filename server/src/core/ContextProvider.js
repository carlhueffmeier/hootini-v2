const UserService = require('../users/UserService');
const { unpackToken } = require('../utils/cryptoUtils');

async function createRequestContext({ authToken } = {}) {
  const context = {
    UserService,
  };
  if (authToken) {
    const payload = await unpackToken(authToken);
    context.userId = payload.userId;
  }

  return context;
}

exports.createRequestContext = createRequestContext;
