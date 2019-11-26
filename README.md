# Secret Key Sharing Library
[![dependencies Status](https://img.shields.io/david/blockchain-werkstatt/shamir-library)](https://img.shields.io/david/blockchain-werkstatt/shamir-library)
[![devDependencies Status](https://img.shields.io/david/dev/blockchain-werkstatt/shamir-library)](https://img.shields.io/david/dev/blockchain-werkstatt/shamir-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# important for demo

try

```sh
npm install
npm start //source example/example.js
```

(it might be breaking some time coz its a PoC only)

this library is the implementation of Shamir Secret sharing (https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) and developed in and for NodeJS.

# Installation

```sh
npm install --save secretkeysharing
```

## Usages

### 1.Secure private key using QnA

**eg. 0xC2D7CF95645D33006175B78989035C7c9061d3F9**
(https://theethereum.wiki/w/index.php/Accounts,_Addresses,_Public_And_Private_Keys,_And_Tokens)

```js
import { split_qna , combine_qna, questions } from 'secretkeysharing'
import { encode , decode } from 'secretkeysharing'
// calling split
const questions_list = [questions[0], questions[1], questions[2], questions[3], questions[4]];
const answers = ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'];
const public_share = split_qna('0xC2D7CF95645D33006175B78989035C7c9061d3F9', 3, questions_list, answers, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413');
// public share can share or save anywhere
console.log('share is: '+ public_share);

// calling combine
// should be greater than 3 else won't work
const questions_recovery = [{i:0, q:questions_list[0]}, {i:1, q:questions_list[1]}, {i:2, q:questions_list[2]}];
const answers_recovery = ['answer1', 'answer2', 'answer3'];
const secret = combine_qna(questions, public_share, questions_recovery, answers_recovery, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413');
// will return the recovered secret
console.log('recoverd secret is : ' + secret);

    //for mnemonic
    // calling split
    const mnemonic = "media badge grid crunch pair captain add cigar ridge either crack private";
    const public_share_mnemonic = split_qna(encode(mnemonic), 3, questions_list, answers, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413', 'mnemonic');
    console.log('share is: '+ public_share_mnemonic);
    
// calling combine
// should be greater than 3 else won't work
    const recovered_mnemonic = combine_qna(questions, public_share_mnemonic, questions_recovery, answers_recovery, '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413', 'mnemonic');
    console.log('recoverd mnemonic is : ' + decode(recovered_mnemonic));
```

### 2.Secure and share the private key
**eg. 0xC2D7CF95645D33006175B78989035C7c9061d3F9**
(https://theethereum.wiki/w/index.php/Accounts,_Addresses,_Public_And_Private_Keys,_And_Tokens)

```js
import { split , combine } from 'secretkeysharing'
import { prime512 , prime3217 , prime19937 } from 'secretkeysharing'
// split function
var splits = split('0xC2D7CF95645D33006175B78989035C7c9061d3F9', 6, 3 , prime512 );
console.log('splits are : '+JSON.stringify(splits, 4, 2));
 // combime function
var privatekey = combine([splits[1],splits[3],splits[2]],prime512).toHex();
console.log('recovery key is : '+ privatekey);
```

### 3. Secure and share the Mnemonic

**eg. witch collapse practice feed shame open despair creek road again ice least**
(https://en.bitcoin.it/wiki/Seed_phrase)

```js
import { split , combine } from 'secretkeysharing'
import { prime512 , prime3217 , prime19937 } from 'secretkeysharing'
import { encode , decode } from 'secretkeysharing'

//Encode the string
var encoded_string = encode('witch collapse practice feed shame open despair creek road again ice least');

//Spit function
var splits = split(encoded_string, 6, 3 , prime512 );

//combine function
var privatekey = combine([splits[1],splits[3],splits[2]],prime512).toHex();

//Decode the key
var decoded_string = decode(privatekey)
// output
console.log(decoded_string);
```
