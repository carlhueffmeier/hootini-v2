function not(fn) {
  return (...args) => !fn(...args);
}

function isNil(value) {
  return value == undefined;
}

const isArray = Array.isArray.bind(Array);

function firstNonNil(...args) {
  return args.find(not(isNil));
}

function curry(fn) {
  return function curriedFn(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return curry(fn.bind(null, ...args));
    }
  };
}

const any = curry((fn, arr) => arr.some(fn));

const none = curry((fn, arr) => !arr.some(fn));

const path = curry((keys, obj) =>
  keys.reduce((result, key) => (result || {})[key], obj),
);

exports.not = not;
exports.isNil = isNil;
exports.isArray = isArray;
exports.firstNonNil = firstNonNil;
exports.curry = curry;
exports.any = any;
exports.none = none;
exports.path = path;
exports.generateSlug = require('slugs');
