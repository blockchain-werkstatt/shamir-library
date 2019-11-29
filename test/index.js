import { expect } from 'chai';
import { split_qna, combine_qna } from '../src/core/qna';
import { questions } from '../src/config/config';

const secret = '0xC2D7CF95645D33006175B78989035C7c9061d3F9';
const mnemonic = "media badge grid crunch pair captain add cigar ridge either crack private";
const questions_list = [questions[0], questions[1], questions[2], questions[3], questions[4]];
const answers = ['bigbang', 'go', 'study', 'skydiving', 'swimming']; 
const minimum_combination = 3; // mandatory for shamir algorithm


describe('secet sharing library tests', () => {
    it('splits qna and combine qna test for private key', done => {
        const publicshare = split_qna(secret, minimum_combination, questions_list, answers, 'hex');
        const recoverSecret = combine_qna(publicshare, [questions[0], questions[1], questions[2]], [answers[0], answers[1], answers[2]], 'hex');
        expect(recoverSecret).to.equals(secret.toLowerCase());
        done();
    });
    it('splits qna and combine qna test for mnemonic', done => {
        const publicshare = split_qna(mnemonic, minimum_combination, questions_list, answers, 'mnemonic');
        const recoverSecret = combine_qna(publicshare, [questions[0], questions[1], questions[2]], [answers[0], answers[1], answers[2]], 'mnemonic');
        expect(recoverSecret).to.equals(mnemonic.toLowerCase());
        done();
    });
});