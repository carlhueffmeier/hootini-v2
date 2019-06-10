const originalEnv = process.env;

describe('config', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    delete process.env.__test_do_not_touch__;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('given value not set in env, returns default', async () => {
    expect(require('./config').__test_do_not_touch__).toBe(true);
  });

  it('given value is set in env, returns env', async () => {
    process.env.__test_do_not_touch__ = false;
    expect(require('./config').__test_do_not_touch__).toBe(false);
  });
});
