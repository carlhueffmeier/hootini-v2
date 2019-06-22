function noop() {
  // 🧘‍
}

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

const any = curry(function any(fn, arr) {
  return arr.some(fn);
});

const none = curry(function none(fn, arr) {
  return !arr.some(fn);
});

const path = curry(function path(keys, obj) {
  return keys.reduce((result, key) => (result || {})[key], obj);
});

function pipe([firstFn = noop, ...fns] = []) {
  return function pipedFunctionCall(...args) {
    return fns.reduce((res, fn) => fn(res), firstFn(...args));
  };
}

const intercept = curry(function interceptor(predicate, fn) {
  return function interceptedFunctionCall(...args) {
    if (!predicate(...args)) {
      // do nothing
    } else {
      fn(...args);
    }
  };
});

function uniq(arr) {
  return [...new Set(arr)];
}

function isTestEnv() {
  return process.env.NODE_ENV === 'test';
}

exports.not = not;
exports.isNil = isNil;
exports.isArray = isArray;
exports.firstNonNil = firstNonNil;
exports.curry = curry;
exports.any = any;
exports.none = none;
exports.path = path;
exports.pipe = pipe;
exports.intercept = intercept;
exports.uniq = uniq;
exports.isTestEnv = isTestEnv;
exports.generateSlug = require('slugs');
