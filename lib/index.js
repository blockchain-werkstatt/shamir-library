'use strict';

var _require = require('./core/utilities'),
    split = _require.split,
    combine = _require.combine,
    prime512 = _require.prime512,
    prime19937 = _require.prime19937,
    prime3217 = _require.prime3217;

var _require2 = require('./core/hex'),
    encode = _require2.encode,
    decode = _require2.decode;

module.exports = {
  split: split,
  combine: combine,
  prime512: prime512,
  prime3217: prime3217,
  prime19937: prime19937,
  encode: encode,
  decode: decode
};