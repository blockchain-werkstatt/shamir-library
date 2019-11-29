'use strict';

var _buffer = require('buffer');

var _buffer2 = _interopRequireDefault(_buffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * @param {String} text text to be encoded to hex
 * @returns {String} hex 
 */
var encode = function encode(text) {
    return '0x' + _buffer2.default.Buffer.from(text).toString("hex");
};

/**
 * 
 * @param {String} hext hex to be decoded to string
 * @returns {String} text 
 */
var decode = function decode(hex) {
    var temp_hex = hex.replace('0x', '');
    return _buffer2.default.Buffer.from(temp_hex, "hex").toString();
};

module.exports = {
    encode: encode,
    decode: decode
};