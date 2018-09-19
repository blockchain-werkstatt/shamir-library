import Buffer from 'buffer'

const encode = (text)=>{
    return '0x'+Buffer.Buffer.from(text).toString("hex");
}

const decode = (hex)=>{
    var temp_hex = hex.replace('0x',''); 
    return Buffer.Buffer.from(temp_hex, "hex").toString();
}

module.exports = {
    encode,
    decode
}