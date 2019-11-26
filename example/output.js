'use strict';

var _qna = require('../lib/core/qna');

var _hex = require('../lib/core/hex');

var _config = require('../lib/config/config');

// calling split
var questions_list = [_config.questions[0], _config.questions[1], _config.questions[2], _config.questions[3], _config.questions[4]];
var answers = ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'];
var public_share = (0, _qna.split_qna)('0xC2D7CF95645D33006175B78989035C7c9061d3F9', 3, questions_list, answers, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413', 'hex');
console.log('share is: ' + public_share);

// calling combine
// should be greater than 3 else won't work
var questions_recovery = [{ i: 0, q: questions_list[0] }, { i: 1, q: questions_list[1] }, { i: 2, q: questions_list[2] }];
var answers_recovery = ['answer1', 'answer2', 'answer3'];
var secret = (0, _qna.combine_qna)(_config.questions, public_share, questions_recovery, answers_recovery, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413', 'hex');
console.log('recoverd secret is : ' + secret);

// calling split
var mnemonic = "media badge grid crunch pair captain add cigar ridge either crack private";
var public_share_mnemonic = (0, _qna.split_qna)((0, _hex.encode)(mnemonic), 3, questions_list, answers, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413', 'mnemonic');
console.log('share is: ' + public_share_mnemonic);

// calling combine
// should be greater than 3 else won't work
var recovered_mnemonic = (0, _qna.combine_qna)(_config.questions, public_share_mnemonic, questions_recovery, answers_recovery, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413', 'mnemonic');
console.log('recoverd mnemonic is : ' + (0, _hex.decode)(recovered_mnemonic));
