'use strict';

var _utilities = require('./utilities');

var _hex = require('./hex');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encrypt = function encrypt(key, text) {
    var cipher = _crypto2.default.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

var decrypt = function decrypt(key, text) {
    var decipher = _crypto2.default.createDecipher('aes-256-cbc', key);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

var split_qna = function split_qna(secret, no_of_combination, questions, answers, publicAddress) {
    var splits = (0, _utilities.split)(secret, questions.length, no_of_combination, _utilities.prime512);
    var answersEncrypted = [];
    var questionEncrypted = [];
    splits.forEach(function (split, index) {
        var encrypted = { a: encrypt(answers[index], JSON.stringify(split)), i: index };
        answersEncrypted.push(encrypted);
    });
    answersEncrypted.forEach(function (ansEncypt, index) {
        var encypted = { q: encrypt(questions[index], JSON.stringify(ansEncypt)), i: index };
        questionEncrypted.push(encypted);
    });
    var publicShare = encrypt(publicAddress, JSON.stringify(questionEncrypted));
    return publicShare;
};

var combine_qna = function combine_qna(originalquestions, publicshare, questions, answers, publicAddress) {
    var originalQuestionSet = originalquestions;
    var questionDecrpted = JSON.parse(decrypt(publicAddress, publicshare));
    var answerDecrpted = [];
    questionDecrpted.forEach(function (ques, index) {
        if (index < questions.length) {
            var question = originalQuestionSet[questions[index].i];
            var decrypted = decrypt(question, questionDecrpted[questions[index].i].q);
            answerDecrpted.push(JSON.parse(decrypted));
        }
    });
    var originalSpits = [];
    answerDecrpted.forEach(function (ans, index) {
        if (index < answers.length) {
            var decrpted = decrypt(answers[index], ans.a);
            originalSpits.push(JSON.parse(decrpted));
        }
    });
    var secret = (0, _utilities.combine)(originalSpits, _utilities.prime512);
    return secret.toHex();
};

module.exports = {
    split_qna: split_qna,
    combine_qna: combine_qna
};