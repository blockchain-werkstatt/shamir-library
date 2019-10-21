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
    console.log(' step 1 . splits from the shamir secret : '+ JSON.stringify(splits, 4, 2));
    var answersEncrypted = [];
    var questionEncrypted = [];
    
    splits.forEach((split, index) => {
       var encrypted = encrypt(answers[index], JSON.stringify(split));
       answersEncrypted.push(encrypted);     
    });
    console.log(' step 2 . splits encypted with answers : '+ JSON.stringify(answersEncrypted, 4, 2));

    answersEncrypted.forEach((ansEncypt, index) => {
        var encypted = encrypt(questions[index], JSON.stringify(ansEncypt));
        questionEncrypted.push(encypted);
    });
    console.log(' step 3 . answersEncrypted encypted with questions : '+ JSON.stringify(questionEncrypted, 4, 2));

    var publicShare = encrypt(publicAddress, JSON.stringify(questionEncrypted));
    console.log('step 4 . public share is :'+ publicShare);
    return publicShare;
    }


const combine_qna = (publicshare, questions, answers, publicAddress) => {

    var questionDecrpted = JSON.parse(decrypt(publicAddress, publicshare));
    console.log('step 1 . question decrption is :'+ questionDecrpted);
    
    var answerDecrpted = [];
    questionDecrpted.forEach((ques, index) => {
        var decrypted = decrypt(questions[index], ques);
        answerDecrpted.push(JSON.parse(decrypted));
    });
    console.log('step 2. answer decryption is : '+ JSON.stringify(answerDecrpted, 4, 2)); 

    var originalSpits = [];
    answerDecrpted.forEach((ans, index) => {
        var decrpted = decrypt(answers[index] ,ans);
        originalSpits.push(JSON.parse(decrpted));
    });
    console.log('step 3. spits for the combine method'  + JSON.stringify(originalSpits, 4, 2) );
    var secret = combine([originalSpits[0],originalSpits[1],originalSpits[2]], prime512);
    console.log('secret is : ' + secret);
    return secret.toHex();
}



    const questions = [config.questions[0], config.questions[1], config.questions[2], config.questions[3], config.questions[4]];
    const answers = ['harpreet', 'kaur', 'allahabad', 'montu', 'suzuki'];
    const public_share = split_qna('0xC2D7CF95645D33006175B78989035C7c9061d3F9', 3, questions, answers, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413');
    console.log('public_share is : ' + public_share);

    // // should be greater than 3 else won't work
    const questions_recovery = [config.questions[0], config.questions[1], config.questions[2], config.questions[3], config.questions[4]];
    const answers_recovery = ['harpreet', 'kaur', 'allahabad', 'montu', 'suzuki'];
    const secret = combine_qna(public_share, questions_recovery, answers_recovery, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413');
    console.log('recoverd secret is : ' + secret);