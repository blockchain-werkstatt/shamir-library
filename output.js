'use strict';

var _utilities = require('./lib/core/utilities');

var _hex = require('./lib/core/hex');

var _config = require('./lib/config/config');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encrypt = function encrypt(key, text) {
    var cipher = _crypto2.default.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

function decrypt(key, text) {
    var decipher = _crypto2.default.createDecipher('aes-256-cbc', key);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

var split_qna = function split_qna(secret, no_of_combination, questions, answers, publicAddress) {
    var splits = (0, _utilities.split)(secret, questions.length, no_of_combination, _utilities.prime512);
    console.log(' step 1 . splits from the shamir secret : ' + JSON.stringify(splits, 4, 2));
    var answersEncrypted = [];
    var questionEncrypted = [];

    splits.forEach(function (split, index) {
        var encrypted = encrypt(answers[index], JSON.stringify(split));
        answersEncrypted.push(encrypted);
    });
    console.log(' step 2 . splits encypted with answers : ' + JSON.stringify(answersEncrypted, 4, 2));

    answersEncrypted.forEach(function (ansEncypt, index) {
        var encypted = encrypt(questions[index], JSON.stringify(ansEncypt));
        questionEncrypted.push(encypted);
    });
    console.log(' step 3 . answersEncrypted encypted with questions : ' + JSON.stringify(questionEncrypted, 4, 2));

    var publicShare = encrypt(publicAddress, JSON.stringify(questionEncrypted));
    console.log('step 4 . public share is :' + publicShare);
    return publicShare;
};

var combine_qna = function combine_qna(publicshare, questions, answers, publicAddress) {

    var questionDecrpted = JSON.parse(decrypt(publicAddress, publicshare));
    console.log('step 1 . question decrption is :' + questionDecrpted);

    var answerDecrpted = [];
    questionDecrpted.forEach(function (ques, index) {
        var decrypted = decrypt(questions[index], ques);
        answerDecrpted.push(JSON.parse(decrypted));
    });
    console.log('step 2. answer decryption is : ' + JSON.stringify(answerDecrpted, 4, 2));

    var originalSpits = [];
    answerDecrpted.forEach(function (ans, index) {
        var decrpted = decrypt(answers[index], ans);
        originalSpits.push(JSON.parse(decrpted));
    });
    console.log('step 3. spits for the combine method' + JSON.stringify(originalSpits, 4, 2));
    var secret = (0, _utilities.combine)([originalSpits[0], originalSpits[1], originalSpits[2]], _utilities.prime512);
    console.log('secret is : ' + secret);
    return secret.toHex();
};

var questions = [_config.config.questions[0], _config.config.questions[1], _config.config.questions[2], _config.config.questions[3], _config.config.questions[4]];
var answers = ['harpreet', 'kaur', 'allahabad', 'montu', 'suzuki'];
var public_share = split_qna('0xC2D7CF95645D33006175B78989035C7c9061d3F9', 3, questions, answers, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413');
console.log('public_share is : ' + public_share);

// // should be greater than 3 else won't work
var questions_recovery = [_config.config.questions[0], _config.config.questions[1], _config.config.questions[2], _config.config.questions[3], _config.config.questions[4]];
var answers_recovery = ['harpreet', 'kaur', 'allahabad', 'montu', 'suzuki'];
var secret = combine_qna(public_share, questions_recovery, answers_recovery, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413');
console.log('recoverd secret is : ' + secret);
