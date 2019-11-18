import {split ,combine,prime19937 , prime3217 , prime512 } from './core/utilities'
import { encode , decode } from './core/hex'
import { split_qna, combine_qna } from './core/qna';
import { questions } from './config/config';

module.exports = {
  split,
  combine,
  prime512,
  prime3217,
  prime19937,
  encode,
  decode,
  split_qna,
  combine_qna,
  questions,
}

