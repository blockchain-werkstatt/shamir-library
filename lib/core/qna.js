'use strict';

var _utilities = require('./utilities');

var _hex = require('./hex');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * @param {String} key key to encypt the test
 * @param {String} text text to be encrypted
 */
var encrypt = function encrypt(key, text) {
    var cipher = _crypto2.default.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

/**
 * 
 * @param {String} key key to decrpyt the test
 * @param {String} text text to be decypted
 */
var decrypt = function decrypt(key, text) {
    var decipher = _crypto2.default.createDecipher('aes-256-cbc', key);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

/**
 * 
 * @param {String} secret key to encypt the test
 * @param {Number} no_of_combination text to be encrypted
 * @param {Array} questions array of the question sets
 * @param {Array} answers array of answers in the same order as questions
 * @param {String} type if secret is hex-type (e.g, private key) the type should be hex
 * @return {String} Public Share
 */
var split_qna = function split_qna(secret, no_of_combination, questions, answers, type) {
    var splits = '';
    var answersEncyption = [];
    var shareObject = [];
    var publicShare = '';
    if (questions.length !== answers.length) {
        throw new Error('question and answer count is not equal');
    }
    if (type === 'hex') {
        splits = (0, _utilities.split)(secret, questions.length, no_of_combination, _utilities.prime512);
    } else {
        splits = (0, _utilities.split)((0, _hex.encode)(secret), questions.length, no_of_combination, _utilities.prime3217);
    }
    splits.forEach(function (split, index) {
        answersEncyption[index] = encrypt(answers[index], JSON.stringify(split));
    });
    answersEncyption.forEach(function (answerEncypt, index) {
        shareObject[index] = { q: questions[index], a: answerEncypt };
    });
    publicShare = Buffer.from(JSON.stringify(shareObject)).toString('base64');
    return publicShare;
};

/**
 * 
 * @param {String} publicshare Public Share generatad by the split_qna function
 * @param {Array} questions array of the question sets
 * @param {Array} answers array of answers in the same order as questions
 * @param {String} type if secret is hex-type (e.g, private key) the type should be hex
 * @returns {String} original secret
 */

var combine_qna = function combine_qna(publicshare, questions, answers, type) {
    var shareObject = '';
    var recoveredSplits = [];
    var splits = [];
    var secret = '';
    if (answers.length < 3) {
        throw new Error('answers should be greater or equal to 3');
    }
    shareObject = JSON.parse(Buffer.from(publicshare, 'base64').toString('ascii'));
    shareObject.forEach(function (share) {
        questions.forEach(function (question) {
            if (question === share.q) {
                recoveredSplits.push(share);
            }
        });
    });
    recoveredSplits.forEach(function (split, index) {
        if (answers[index] !== undefined && answers[index] !== null) {
            splits[index] = JSON.parse(decrypt(answers[index], split.a));
        }
    });
    if (type === 'hex') {
        secret = (0, _utilities.combine)(splits, _utilities.prime512);
        return secret.toHex();
    } else {
        secret = (0, _utilities.combine)(splits, _utilities.prime3217);
        return (0, _hex.decode)(secret.toHex());
    }
};

module.exports = {
    split_qna: split_qna,
    combine_qna: combine_qna
};