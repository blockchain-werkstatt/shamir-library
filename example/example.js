import {split ,combine, prime19937  , prime512 } from '../lib/core/utilities';
import {split_qna ,combine_qna } from '../lib/core/qna';
import { questions } from '../lib/config/config';

// calling split_qna
    const questions_list = [questions[0], questions[1], questions[2], questions[3], questions[4]];
    const answers = ['bigbang', 'go', 'study', 'skydiving', 'swimming'];
    // public share, can be store anywhere
    const public_share = split_qna('0xC2D7CF95645D33006175B78989035C7c9061d3F9', 3, questions_list, answers, 'hex');
    
// calling combine
    const questions_recovery = [questions[0], questions[1], questions[2]];
    const answers_recovery = ['bigbang', 'go', 'study'];
    const secret = combine_qna( public_share, questions_recovery, answers_recovery , 'hex');
    console.log('recoverd secret is : ' + secret);


//     // calling split
    const mnemonic = "media badge grid crunch pair captain add cigar ridge either crack private";
    // public share, can be store anywhere
    const public_share_mnemonic = split_qna( mnemonic, 3, questions_list, answers, 'mnemonic');
    
// // calling combine
    const recovered_mnemonic = combine_qna( public_share_mnemonic, questions_recovery, answers_recovery , 'mnemonic');
    console.log('recoverd mnemonic is : ' + recovered_mnemonic);