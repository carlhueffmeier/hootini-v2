const localEvents = require('./localEvents');

describe('localEvents', () => {
  it('calls subscriber', async () => {
    const eventHandler = jest.fn();
    localEvents.subscribe('event', eventHandler);
    localEvents.publish('event');
    expect(eventHandler).toHaveBeenCalled();
  });

  it('calls all subscribers', async () => {
    const eventHandlers = [jest.fn(), jest.fn()];
    eventHandlers.forEach(handler => localEvents.subscribe('event', handler));
    localEvents.publish('event');
    eventHandlers.forEach(handler => expect(handler).toHaveBeenCalled());
  });
});
