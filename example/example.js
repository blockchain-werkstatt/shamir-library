import {split_qna ,combine_qna} from '../lib/core/qna';
import { encode , decode } from '../lib/core/hex'
import { questions } from '../lib/config/config';

// calling split
    const questions_list = [questions[0], questions[1], questions[2], questions[3], questions[4]];
    const answers = ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'];
    const public_share = split_qna('0xC2D7CF95645D33006175B78989035C7c9061d3F9', 3, questions_list, answers, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413', 'hex');
    console.log('share is: '+ public_share);
    
// calling combine
// should be greater than 3 else won't work
    const questions_recovery = [{i:0, q:questions_list[0]}, {i:1, q:questions_list[1]}, {i:2, q:questions_list[2]}];
    const answers_recovery = ['answer1', 'answer2', 'answer3'];
    const secret = combine_qna(questions, public_share, questions_recovery, answers_recovery, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413', 'hex');
    console.log('recoverd secret is : ' + secret);


    // calling split
    const mnemonic = "media badge grid crunch pair captain add cigar ridge either crack private";
    const public_share_mnemonic = split_qna(encode(mnemonic), 3, questions_list, answers, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413', 'mnemonic');
    console.log('share is: '+ public_share_mnemonic);
    
// calling combine
// should be greater than 3 else won't work
    const recovered_mnemonic = combine_qna(questions, public_share_mnemonic, questions_recovery, answers_recovery, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413', 'mnemonic');
    console.log('recoverd mnemonic is : ' + decode(recovered_mnemonic));