const crypto = require('crypto');

function generateKey() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    }); 
}

let key = generateKey();
let private_key = key.privateKey;
let public_key = key.publicKey;


function _base64ToArrayBuffer(base64) {
    return Base64Binary.decodeArrayBuffer(base64); ;
}

function encrypt(string, key){
    return crypto.publicEncrypt(
        {
            key: key,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(string)
    ).toString('base64');
}

function decrypt(encrypted_string, key)
{
    return  crypto.privateDecrypt(
        {
            key: key,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        encrypted_string
        
    ).toString('utf-8');
}

text = "Hello World";

encrypted_text = encrypt(text, public_key);
console.log(encrypted_text);
decrypted_text = decrypt(Buffer.from(encrypted_text, 'base64'), private_key);
console.log(decrypted_text);

