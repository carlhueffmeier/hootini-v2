const { firstNonNil } = require('./common/helpers');

const config = {
  get jwt_secret() {
    return firstNonNil(process.env.JWT_SECRET, 'superdupersecret');
  },
  get salt_rounds() {
    return firstNonNil(process.env.SALT_ROUNDS, 10);
  },
  get __test_do_not_touch__() {
    return firstNonNil(process.env.__test_do_not_touch__, true);
  },
};

module.exports = config;
