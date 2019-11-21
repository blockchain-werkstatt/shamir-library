import {split ,combine, prime19937 , prime3217 , prime512 } from './utilities'
import { encode , decode } from './hex'
import crypto from 'crypto';


const encrypt = (key, text) => {
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

const decrypt = (key, text) =>{
    var decipher = crypto.createDecipher('aes-256-cbc', key)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }

const split_qna = (secret, no_of_combination, questions, answers, publicAddress, type) => {
    var splits = '';
    if(type === 'hex') {
        splits = split(secret, questions.length, no_of_combination , prime512 );
    } else {
        splits = split(secret, questions.length, no_of_combination , prime3217 );
    }
    var answersEncrypted = [];
    var questionEncrypted = [];    
    splits.forEach((split, index) => {
       var encrypted = {a: (encrypt(answers[index], JSON.stringify(split))), i: index };
       answersEncrypted.push(encrypted);     
    });
    answersEncrypted.forEach((ansEncypt, index) => {
        var encypted = {q: (encrypt(questions[index], JSON.stringify(ansEncypt))), i: index };
        questionEncrypted.push(encypted);
    });
    var publicShare = encrypt(publicAddress, JSON.stringify(questionEncrypted));
    return publicShare;
    }


const combine_qna = (originalquestions, publicshare, questions, answers, publicAddress, type) => {
    const originalQuestionSet = originalquestions;
    var questionDecrpted = JSON.parse(decrypt(publicAddress, publicshare));
    var answerDecrpted = [];
    questionDecrpted.forEach((ques, index) => {
        if(index < questions.length) {
            const question = originalQuestionSet[questions[index].i];
            var decrypted = decrypt(question, questionDecrpted[questions[index].i].q);
            answerDecrpted.push(JSON.parse(decrypted));
        }
    });
    var originalSpits = [];
    answerDecrpted.forEach((ans, index) => {
        if(index < answers.length) {
            var decrpted = decrypt(answers[index] ,ans.a);
            originalSpits.push(JSON.parse(decrpted));
        }
    });
    var secret = '';
    if(type === 'hex') {
        secret = combine(originalSpits, prime512);
    } else  {
        secret = combine(originalSpits, prime3217);
    }
    return secret.toHex();
}

module.exports = {
    split_qna,
    combine_qna,
}