# Secret Key Sharing Library

this library is the implementation of Shamir Secret sharing (https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) and developed in and for NodeJS.
# Installation

```sh
$ npm install --save git+ssh://git@gitlab.fokus.fraunhofer.de:Secret_Sharing/library.git
```

or 
```sh
$ git clone git@gitlab.fokus.fraunhofer.de:Secret_Sharing/library.git
$ cd {your_project_directory}
$ npm install --save {PATH_TO_SECRET_SHARING_LIBRARY}
```
# Publishing the Package to Nexus Repository 
to publish the package on the Nexus Package Manager  Host : (http://paca.fokus.fraunhofer.de)
```sh
$ export NPM_NEXUS_PUBLISHER_EMAIL={YOUR_EMAIL_ADDRESS}
$ export NPM_NEXUS_PUBLISHER_AUTH={BASE64(username:password)}
$ npm run publish_nexus
```
# Usages
1. to secure the and share the private key 
**eg. 0xC2D7CF95645D33006175B78989035C7c9061d3F9**
(https://theethereum.wiki/w/index.php/Accounts,_Addresses,_Public_And_Private_Keys,_And_Tokens)

```sh
import { split , combine } from 'secretkeysharing'
import { prime512 , prime3217 , prime19937 } from 'secretkeysharing'

/**
 * split function takes 4 inputs 
 * @param {String} secretkey - the sceret key which has to be secure 
 * @param {Number} share - The Number of Shares to be generate . Minimum '3' is required
 * @param {Number} recover - Minimum number of key require to combine and recover the secret key Minimum '3' is required
 * @param {Decimal} Prime Power Fraction - \Prime512' is recommended , in case of Extra long strings other fractions can be used
 */
 
var splits = split('0xC2D7CF95645D33006175B78989035C7c9061d3F9', 6, 3 , prime512 );
console.log('splits are : '+JSON.stringify(splits, 4, 2));
```

```sh
//OUTPUT : 
//splits are : [
//  {
//  "x": "1",
 //"y": "0x5e77d761774512c79f918b30a7cbf62bbab8d3ea06881e5f92e5d46dca61569fdab0c95114d9bf44d6b1cb4f2b4dfafb883bdbd72db31acb565948778ee47291"
//  },
//  {
//   "x": "2",
 //   "y": "0xd3f7fb25af620a640fcfdec3efa350a4738dc8ebb0173caa3aba4343d7592c122563ddb8cb8207c4542c1cce7e7e85c5ff1cbd8c985ce2182525a04b2bdba099"
//  },
//  {
//    "x": "3",
//    "y": "0x60806b4ca856e6d550bafab9d7860f6a2a7edf04fcad5adff77d4c8226e78056e0193d3723f8d97e786ef47ebc696ff4c8ffd820a1730d6ff56863f767475e12"
//  },
//  {
//    "x": "4",
//    "y": "0x41127d66223a81b6252df125f74327cdf8c1635ec4a7900c92ef028b90c536e0ad0e7cc1e3e3473437a525fe50eb987e5e52b9348f59cd2c721937c4127aafb"
//  },
//  {
//    "x": "5",
//    "y": "0xbeaa30c2dcc84e3644978bcd876db9dc92b56e7e7eee970cafcf2e378dc7a557a58add77ba5218a2b54e3671f86e627f55ccb7e48ee490409a512ed9b97c8753"
//  },
//  {
//    "x": "6",
//    "y": "0x904b86121844d925f78900eb4f72a58943fae7deb499b503ab5e06aea5197613b0471e39f834860ccdeaa0b4f6886adb18b67d14733fe7b96ef7360fd045f31c"
//  }
//]
```

```sh
/**
 * combime function takes 2 inputs 
 * @param {Array} sharedkeys - array of split shared key minimum '3' required
  * @param {Decimal} Prime Power Fraction which is used while spliting the keys
 */
var privatekey = combine([splits[1],splits[3],splits[2]],prime512).toHex();
console.log('recovery key is : '+ privatekey);
```

```sh
//OUTPUT
//recovery key is : 0xc2d7cf95645d33006175b78989035c7c9061d3f9
```


1. to secure the and share the Mnemonic
**eg. witch collapse practice feed shame open despair creek road again ice least**
(https://en.bitcoin.it/wiki/Seed_phrase)

```sh
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

console.log(decoded_string);
// output :
// witch collapse practice feed shame open despair creek road again ice least
```
