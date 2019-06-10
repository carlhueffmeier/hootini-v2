function not(fn) {
  return (...args) => !fn(...args);
}

function isNil(value) {
  return value == undefined;
}

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

exports.not = not;
exports.isNil = isNil;
exports.firstNonNil = firstNonNil;
exports.curry = curry;
exports.any = any;
exports.none = none;
