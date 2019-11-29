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

this library is the implementation of [Shamir Secret sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) and developed in and for NodeJS.

# Installation

```sh
npm install --save secretkeysharing
```

## Usages

### 1.Secure private key using QnA
**eg. [0xC2D7CF95645D33006175B78989035C7c9061d3F9](https://theethereum.wiki/w/index.php/Accounts,_Addresses,_Public_And_Private_Keys,_And_Tokens)**


```js
//import functions from the library
import { split_qna , combine_qna, questions } from 'secretkeysharing'

// questions
const questions_list = [questions[0], questions[1], questions[2], questions[3], questions[4]];

// answers
const answers = ['bigbang', 'go', 'study', 'skydiving', 'swimming'];
// calling split_qna
// public share, can be store anywhere
const public_share = split_qna('0xC2D7CF95645D33006175B78989035C7c9061d3F9', 3, questions_list, answers, 'hex');
    
// calling combine
const secret = combine_qna( public_share, [questions[0], questions[1], questions[2]], ['bigbang', 'go', 'study'] , 'hex');
console.log('recoverd secret is : ' + secret);

// mnemonic
const mnemonic = "media badge grid crunch pair captain add cigar ridge either crack private";

// public share, can be store anywhere
const public_share_mnemonic = split_qna( mnemonic, 3, questions_list, answers, 'mnemonic');
    
// calling combine
const recovered_mnemonic = combine_qna( public_share_mnemonic, questions_recovery, answers_recovery , 'mnemonic');

console.log('recoverd mnemonic is : ' + recovered_mnemonic);
```

### 2.Secure and share the private key
**eg. [0xC2D7CF95645D33006175B78989035C7c9061d3F9](https://theethereum.wiki/w/index.php/Accounts,_Addresses,_Public_And_Private_Keys,_And_Tokens)**

```js
import { split , combine } from 'secretkeysharing'
import { prime512 , prime3217 , prime19937 } from 'secretkeysharing'

// split function
var splits = split('0xC2D7CF95645D33006175B78989035C7c9061d3F9', 6, 3 , prime512 );

// splits
console.log('splits are : '+JSON.stringify(splits, 4, 2));


 // combime function
var privatekey = combine([splits[1],splits[3],splits[2]],prime512).toHex();

// recoverd key
console.log('recovery key is : '+ privatekey);
```

### 3. Secure and share the Mnemonic

**eg. [witch collapse practice feed shame open despair creek road again ice least](https://en.bitcoin.it/wiki/Seed_phrase)**

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
