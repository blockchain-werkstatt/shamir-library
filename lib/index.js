'use strict';

var _utilities = require('./core/utilities');

var _hex = require('./core/hex');

var _qna = require('./core/qna');

var _config = require('./config/config');

module.exports = {
  split: _utilities.split,
  combine: _utilities.combine,
  prime512: _utilities.prime512,
  prime3217: _utilities.prime3217,
  prime19937: _utilities.prime19937,
  encode: _hex.encode,
  decode: _hex.decode,
  split_qna: _qna.split_qna,
  combine_qna: _qna.combine_qna,
  questions: _config.questions
};