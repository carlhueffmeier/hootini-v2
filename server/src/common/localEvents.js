const EventEmitter = require('events');

const emitter = new EventEmitter();

function publish(event, payload) {
  emitter.emit(event, payload);
}

function subscribe(event, handler) {
  emitter.on(event, handler);
}

exports.publish = publish;
exports.subscribe = subscribe;
