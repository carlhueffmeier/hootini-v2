module.exports = {
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['**/src/**/?(*.)+(spec|test).js'],
  transformIgnorePatterns: ['/node_modules/'],
};
