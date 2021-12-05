const crypto = require('crypto');
const CryptoJS =  require('crypto-js');


function decrypt(encrypted_string, key)
{
    const decrypted = CryptoJS.AES.decrypt(encrypted_string, key);
    stri = decrypted.toString(CryptoJS.enc.Utf8)
    console.log(stri);
    return stri;
}

tex = "346acf68d2d02bc09d89ddff91aa1816"
key = "abcdefghijklmnop"

console.log(decrypt(tex, key))


// function makeid(length) {
//     var result = '';
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

// console.log(makeid(5))

