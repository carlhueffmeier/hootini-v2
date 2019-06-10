class AuthenticationError extends Error {
  constructor(message = 'Authentication Error', ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message, ...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthenticationError);
    }

    this.name = 'AuthenticationError';
  }
}

module.exports = AuthenticationError;
