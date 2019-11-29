import Buffer from 'buffer'

/**
 * 
 * @param {String} text text to be encoded to hex
 * @returns {String} hex 
 */
const encode = (text)=>{
    return '0x'+Buffer.Buffer.from(text).toString("hex");
}

/**
 * 
 * @param {String} hext hex to be decoded to string
 * @returns {String} text 
 */
const decode = (hex)=>{
    var temp_hex = hex.replace('0x',''); 
    return Buffer.Buffer.from(temp_hex, "hex").toString();
}

module.exports = {
    encode,
    decode
}