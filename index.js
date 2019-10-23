import {split ,combine, prime19937 , prime3217 , prime512 } from './lib/core/utilities'
import { encode , decode } from './lib/core/hex'
import { config } from './lib/config/config';
import crypto from 'crypto';


const encrypt = (key, text) => {
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(key, text){
    var decipher = crypto.createDecipher('aes-256-cbc', key)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }

const split_qna = (secret, no_of_combination, questions, answers, publicAddress) => {
    var splits = split(secret, questions.length, no_of_combination , prime512 );
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


const combine_qna = (publicshare, questions, answers, publicAddress) => {
    const originalQuestionSet = config.questions;
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
    var secret = combine(originalSpits, prime512);
    return secret.toHex();
}



// calling split
    const questions = [config.questions[0], config.questions[1], config.questions[2], config.questions[3], config.questions[4]];
    const answers = ['harpreet', 'kaur', 'allahabad', 'montu', 'suzuki'];
    const public_share = split_qna('0xC2D7CF95645D33006175B78989035C7c9061d3F9', 3, questions, answers, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413');
    console.log('share is: '+ public_share);
// calling combine
    // // should be greater than 3 else won't work
    const questions_recovery = [{i:0, q:config.questions[0]}, {i:4, q:config.questions[4]}, {i:2, q:config.questions[2]}];
    const answers_recovery = ['harpreet', 'suzuki', 'allahabad'];
    const secret = combine_qna(public_share, questions_recovery, answers_recovery, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413');
    console.log('recoverd secret is : ' + secret);