'use strict';

var _utilities = require('../lib/core/utilities');

var _qna = require('../lib/core/qna');

var _config = require('../lib/config/config');

// calling split_qna
var questions_list = [_config.questions[0], _config.questions[1], _config.questions[2], _config.questions[3], _config.questions[4]];
var answers = ['bigbang', 'go', 'study', 'skydiving', 'swimming'];
// public share, can be store anywhere
var public_share = (0, _qna.split_qna)('0xC2D7CF95645D33006175B78989035C7c9061d3F9', 3, questions_list, answers, 'hex');

// calling combine
var questions_recovery = [_config.questions[0], _config.questions[1], _config.questions[2]];
var answers_recovery = ['bigbang', 'go', 'study'];
var secret = (0, _qna.combine_qna)(public_share, questions_recovery, answers_recovery, 'hex');
console.log('recoverd secret is : ' + secret);

//     // calling split
var mnemonic = "media badge grid crunch pair captain add cigar ridge either crack private";
// public share, can be store anywhere
var public_share_mnemonic = (0, _qna.split_qna)(mnemonic, 3, questions_list, answers, 'mnemonic');

// // calling combine
var recovered_mnemonic = (0, _qna.combine_qna)(public_share_mnemonic, questions_recovery, answers_recovery, 'mnemonic');
console.log('recoverd mnemonic is : ' + recovered_mnemonic);
