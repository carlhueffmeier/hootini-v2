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
});
