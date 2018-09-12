const { split, combine ,prime512 ,prime19937, prime3217 } = require('./core/utilities')
const { encode , decode } = require('./core/hex')

module.exports = {
  split,
  combine,
  prime512,
  prime3217,
  prime19937,
  encode,
  decode
}