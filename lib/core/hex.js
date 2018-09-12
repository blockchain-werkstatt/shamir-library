'use strict';

var Buffer = require('buffer/').Buffer;

//for the instantiation

var bigPrime = function bigPrime() {
    return '0x7465737475626720697320776f726b696e67';
};
var bigString = function bigString() {
    return 'abcasdjdgsdklgjgkj3kjglksjsklkj3kjlkj23lkjgkljg';
};

var encode = function encode(text) {
    return '0x' + Buffer.from(text).toString("hex");
};

var decode = function decode(hex) {
    var temp_hex = hex.replace('0x', '');
    return Buffer.from(temp_hex, "hex").toString();
};

module.exports = {
    encode: encode,
    decode: decode,
    bigPrime: bigPrime,
    bigString: bigString
};