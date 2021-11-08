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
console.log(private_key);
console.log(public_key);


function encrypt(string, key){
    return crypto.publicEncrypt(
        {
            key: key,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(string)
    );
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
mt=`
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
console.log(private_key);
console.log(public_key);

function encrypt(string, key){
    return crypto.publicEncrypt(
        {
            key: key,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        // We convert the data string to a buffer using 
        Buffer.from(string)
    );
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
console.log(encrypted_text.toString('base64'));
decrypted_text = decrypt(encrypted_text, private_key);
console.log(decrypted_text);
`
encrypted_text = encrypt(mt, public_key);
console.log(encrypted_text.toString('base64'));
decrypted_text = decrypt(encrypted_text, private_key);
console.log(decrypted_text);