const helpers = require('./helpers');

describe('helpers', () => {
  it('firstNonNil()', () => {
    expect(helpers.firstNonNil(4)).toBe(4);
    expect(helpers.firstNonNil(null, 4)).toBe(4);
    expect(helpers.firstNonNil(undefined, null, 4)).toBe(4);
  });

  describe('isNil()', () => {
    it('should be nil for undefined and null', () => {
      const shouldBeNil = [undefined, null];
      shouldBeNil.forEach(arg => expect(helpers.isNil(arg)).toBe(true));
    });
    it('should not be nil for values except undefined and null', () => {
      const shouldNotBeNil = [0, false, {}, [], '', () => {}];
      shouldNotBeNil.forEach(arg => expect(helpers.isNil(arg)).toBe(false));
    });
  });

  describe('curry()', () => {
    it('works for arity of 2', async () => {
      const curriedAdd = helpers.curry((a, b) => a + b);
      expect(curriedAdd(1)(1)).toBe(2);
    });

    it('works for arity of n', async () => {
      const curriedSum = helpers.curry((a, b, c, d, e) => a + b + c + d + e);
      expect(curriedSum(1)(1)(1)(1)(1)).toBe(5);
    });

    it('keeps argument order', async () => {
      const curriedSubtract = helpers.curry((a, b) => a - b);
      expect(curriedSubtract(2)(1)).toBe(1);
    });
  });

  describe('none()', () => {
    it('given [true, false], returns false', async () => {
      expect(helpers.none(x => x, [true, false])).toBe(false);
    });

    it('given [false, false], returns true', async () => {
      expect(helpers.none(x => x, [false, false])).toBe(true);
    });

    it('is curried', async () => {
      expect(helpers.none(x => x)([])).toBe(true);
    });
  });

  describe('path()', () => {
    const object = { a: [{ b: { c: 3 } }] };

    it('given valid path, returns correct value', async () => {
      const result = helpers.path(['a', '0', 'b', 'c'], object);
      expect(result).toBe(3);
    });

    it('given invalid path, returns undefined', async () => {
      const result = helpers.path(['a', 'b', 'c'], object);
      expect(result).toBeUndefined();
    });

    it('is curried', async () => {
      const result = helpers.path(['a', '0', 'b', 'c'])(object);
      expect(result).toBe(3);
    });
  });

  describe('pipe()', () => {
    it('should execute functions in correct order', () => {
      const increment = x => x + 1;
      const multiplyBy10 = x => x * 10;
      const pipedCall = helpers.pipe([increment, multiplyBy10]);

      expect(pipedCall(0)).toBe(10);
      expect(pipedCall(9)).toBe(100);
    });

    it('should execute functions only once', () => {
      const increment = jest.fn(x => x + 1);
      const multiplyBy10 = jest.fn(x => x * 10);
      const pipedCall = helpers.pipe([increment, multiplyBy10]);

      pipedCall(0);
      expect(increment).toHaveBeenCalled();
      expect(multiplyBy10).toHaveBeenCalled();
    });

    it('should work with multiple input arguments', () => {
      const add = (a, b) => a + b;
      const multiplyBy10 = x => x * 10;
      const pipedCall = helpers.pipe([add, multiplyBy10]);

      expect(pipedCall(1, 4)).toBe(50);
      expect(pipedCall(5, 5)).toBe(100);
    });
  });

  describe('intercept()', () => {
    var predicate, interceptedFn, interceptedCall;

    beforeEach(() => {
      predicate = jest.fn();
      interceptedFn = jest.fn();
      interceptedCall = helpers.intercept(predicate, interceptedFn);
    });

    it('given predicate is true, should call original method', () => {
      predicate.mockReturnValueOnce(true);
      interceptedCall(42);
      expect(interceptedFn.mock.calls).toEqual([[42]]);
    });

    it('given predicate is false, should not call original method', () => {
      predicate.mockReturnValueOnce(false);
      interceptedCall(42);
      expect(interceptedFn.mock.calls).toEqual([]);
    });

    it('should pass input to predicate', () => {
      interceptedCall(42);
      expect(predicate.mock.calls).toEqual([[42]]);
    });
  });

  describe('omit()', () => {
    it('should omit all specified keys', () => {
      const input = { a: 1, b: 2, c: 3 };
      expect(helpers.omit(['a'], input)).toEqual({ b: 2, c: 3 });
      expect(helpers.omit(['a', 'b'], input)).toEqual({ c: 3 });
      expect(helpers.omit(['a', 'b', 'c'], input)).toEqual({});
    });

    it('should ignore keys not present in input', () => {
      const input = { a: 1, b: 2, c: 3 };
      expect(helpers.omit(['d'], input)).toEqual({ a: 1, b: 2, c: 3 });
      expect(helpers.omit(['d', 'c'], input)).toEqual({ a: 1, b: 2 });
      expect(helpers.omit(['d', 'c', 'b'], input)).toEqual({ a: 1 });
    });
  });

  describe('uniq()', () => {
    it('should keep distinct values', () => {
      const result = helpers.uniq([1, 2, 3, 1, 2, 3]);
      expect(result).toStrictEqual([1, 2, 3]);
    });
  });

  describe('nTimes', () => {
    it('should create n identical copies', () => {
      const result = helpers.nTimes(5, {});
      expect(result).toHaveLength(5);
      expect(result[0]).toBe(result[1]);
    });

    it('given a function as argument, should execute n times', () => {
      const fooGenerator = jest.fn().mockReturnValue('foo');
      const result = helpers.nTimes(3, fooGenerator);
      expect(fooGenerator).toHaveBeenCalledTimes(3);
      expect(result).toEqual(['foo', 'foo', 'foo']);
    });
  });

  describe('generateSlug()', () => {
    it('given mixed case, returns all lower case', async () => {
      checkSlug('Spanish', 'spanish');
      checkSlug('SPANISH', 'spanish');
    });

    it('given umlaut, returns correct representation', async () => {
      checkSlug('Ü', 'ue');
      checkSlug('ü', 'ue');
      checkSlug('Ö', 'oe');
      checkSlug('ö', 'oe');
      checkSlug('Ä', 'ae');
      checkSlug('ä', 'ae');
      checkSlug('ß', 'ss');
    });

    it('given multiple spaces, returns single dash', async () => {
      checkSlug('Spanish  Vocabulary', 'spanish--vocabulary');
    });

    it('given space on either side, should be trimmed', async () => {
      checkSlug('    spanish vocabulary       ', 'spanish-vocabulary');
    });

    it('given alphanumeric character, should be omitted', async () => {
      checkSlug(')({}:"spanish&&&&@@@@@grammar^!@)(5', 'spanishgrammar5');
    });

    it('given _, should be preserved', async () => {
      checkSlug('_-_-_', '_-_-_');
    });

    function checkSlug(input, expected) {
      const result = helpers.generateSlug(input);
      expect(result).toBe(expected);
    }
  });

  describe('merge()', () => {
    var object = { a: [{ b: 2 }, { d: 4 }] };
    var other = { a: [{ c: 3 }, { e: 5 }] };

    const result = helpers.merge(object, other);
    const expected = { a: [{ b: 2, c: 3 }, { d: 4, e: 5 }] };
    expect(result).toEqual(expected);
  });

  describe('isTestEnv()', () => {
    var originalNodeEnv;

    beforeEach(() => {
      originalNodeEnv = process.env.NODE_ENV;
    });

    afterEach(() => {
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('should be true when `process.env` is not modified', () => {
      expect(helpers.isTestEnv()).toBe(true);
    });

    it('should be false when `process.env` is "production"', () => {
      process.env.NODE_ENV = 'production';
      expect(helpers.isTestEnv()).toBe(false);
    });
  });
});
