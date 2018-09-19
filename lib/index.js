'use strict';

var _utilities = require('./core/utilities');

var _hex = require('./core/hex');

module.exports = {
  split: _utilities.split,
  combine: _utilities.combine,
  prime512: _utilities.prime512,
  prime3217: _utilities.prime3217,
  prime19937: _utilities.prime19937,
  encode: _hex.encode,
  decode: _hex.decode
};