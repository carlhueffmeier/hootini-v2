const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('../config');

function calculatePasswordHash(password) {
  return bcrypt.hash(password, config.salt_rounds);
}

function compareToHash(password, hash) {
  return bcrypt.compare(password, hash);
}

function generateToken(userId) {
  return promisify(jwt.sign)({ userId }, config.jwt_secret);
}

function unpackToken(token) {
  return promisify(jwt.verify)(token, config.jwt_secret);
}

exports.calculatePasswordHash = calculatePasswordHash;
exports.compareToHash = compareToHash;
exports.generateToken = generateToken;
exports.unpackToken = unpackToken;
