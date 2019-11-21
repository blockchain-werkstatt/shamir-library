'use strict';

var _qna = require('../lib/core/qna');

var _config = require('../lib/config/config');

// calling split
var questions_list = [_config.questions[0], _config.questions[1], _config.questions[2], _config.questions[3], _config.questions[4]];
var answers = ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'];
var public_share = (0, _qna.split_qna)('0x73616d6520746f7920746f6e652062617369632062656361757365206f6e636520707572706f7365207072696d6172792079656c6c6f7720696e646963617465206e75636c65617220726573706f6e7365', 3, questions_list, answers, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413', '');
console.log('share is: ' + public_share);

// calling combine
// should be greater than 3 else won't work
var questions_recovery = [{ i: 0, q: questions_list[0] }, { i: 1, q: questions_list[1] }, { i: 2, q: questions_list[2] }];
var answers_recovery = ['answer1', 'answer2', 'answer3'];
var secret = (0, _qna.combine_qna)(_config.questions, public_share, questions_recovery, answers_recovery, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413', '');
console.log('recoverd secret is : ' + secret);
