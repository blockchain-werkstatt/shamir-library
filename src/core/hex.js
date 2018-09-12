const Buffer = require('buffer/').Buffer

//for the instantiation

const bigPrime = () =>'0x7465737475626720697320776f726b696e67'
const bigString = () =>'abcasdjdgsdklgjgkj3kjglksjsklkj3kjlkj23lkjgkljg';


const encode = (text)=>{
    return '0x'+Buffer.from(text).toString("hex");
}

const decode = (hex)=>{
    var temp_hex = hex.replace('0x',''); 
    return Buffer.from(temp_hex, "hex").toString();
}

module.exports = {
    encode,
    decode,
    bigPrime,
    bigString
}