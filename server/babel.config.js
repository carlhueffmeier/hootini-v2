module.exports = function(api) {
  api.cache.forever();
  return {
    presets: [require('@babel/preset-env')],
    plugins: [
      require('@babel/plugin-proposal-object-rest-spread'),
      require('@babel/plugin-transform-runtime'),
    ],
  };
};
