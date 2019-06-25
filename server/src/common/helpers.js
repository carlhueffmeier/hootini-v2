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

function pickBy(predicate, object) {
  return Object.entries(object).reduce((result, [key, value]) => {
    if (predicate(key, value)) {
      result[key] = value;
    }
    return result;
  }, {});
}

function omit(keys, object) {
  return pickBy(key => !keys.includes(key), object);
}

function nTimes(n, what) {
  const isFn = typeof what === 'function';
  const result = [];
  for (let i = 0; i < n; i += 1) {
    result.push(isFn ? what() : what);
  }
  return result;
}

function isTestEnv() {
  return process.env.NODE_ENV === 'test';
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
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
exports.omit = omit;
exports.nTimes = nTimes;
exports.isTestEnv = isTestEnv;
exports.escapeRegExp = escapeRegExp;
exports.merge = require('lodash.merge');
exports.generateSlug = require('slugs');
