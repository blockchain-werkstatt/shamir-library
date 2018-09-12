// const encode = require('./core/hex').encode;
// const decode = require('./core/hex').decode;
// const shamir = require('./core/utilities');
// const string = encode("testubg is working");

// console.log('encoded is '+string)
// console.log('decoded is '+decode('7465737475626720697320776f726b696e67'));


// // Exmaple Bitcoin private key from https://en.bitcoin.it/wiki/Private_key
// const example = string;

// // Split the secret into 6 shares such that at least 3 shares are required to reconstruct the secret
// const shares = shamir.split(example, 6, 3, shamir.prime512);
// // => [{ x: 1, y: 0x... }, { x: 2, y: 0x... }, ... ,{ x: 6, y: 0x... }]
// console.log("shares are :"+JSON.stringify(shares));
// const secret = shamir.combine([shares[0], shares[1], shares[2]], shamir.prime512).toHex();
// // => 0xe9873d79c6d87dc0fb6a5778633389f4453213303da61f20bd67
// console.log("secret are :"+JSON.stringify(decode(secret)));
"use strict";