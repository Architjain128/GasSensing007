// const crypto = require('crypto');

// function generateKey() {
//     return crypto.generateKeyPairSync('rsa', {
//         modulusLength: 2048,
//         publicKeyEncoding: {
//             type: 'spki',
//             format: 'pem'
//         },
//         privateKeyEncoding: {
//             type: 'pkcs8',
//             format: 'pem'
//         }
//     }); 
// }

// let key = generateKey();
// let private_key = key.privateKey;
// let public_key = key.publicKey;


// function _base64ToArrayBuffer(base64) {
//     return Base64Binary.decodeArrayBuffer(base64); ;
// }

// function encrypt(string, key){
//     return crypto.publicEncrypt(
//         {
//             key: key,
//             padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//             oaepHash: "sha256",
//         },
//         // We convert the data string to a buffer using `Buffer.from`
//         Buffer.from(string)
//     ).toString('base64');
// }

// function decrypt(encrypted_string, key)
// {
//     return  crypto.privateDecrypt(
//         {
//             key: key,
//             padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//             oaepHash: "sha256",
//         },
//         encrypted_string
        
//     ).toString('utf-8');
// }

// text = "Hello World";

// encrypted_text = encrypt(text, public_key);
// console.log(encrypted_text);
// decrypted_text = decrypt(Buffer.from(encrypted_text, 'base64'), private_key);
// console.log(decrypted_text);

const axios = require('axios');
async function aaa(){
    await axios.get("https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-15/Node-1/Data/?rcn=4",{
        headers : {
            "X-M2M-Origin": "fRZvzNA7Bp:i43Yn0WPem"
        }
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}

let data = aaa();
