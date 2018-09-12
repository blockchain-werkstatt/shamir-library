'use strict';

var Buffer = require('buffer/').Buffer;

var encode = function encode(text) {
    return '0x' + Buffer.from(text).toString("hex");
};

var decode = function decode(hex) {
    var temp_hex = hex.replace('0x', '');
    return Buffer.from(temp_hex, "hex").toString();
};

module.exports = {
    encode: encode,
    decode: decode
};