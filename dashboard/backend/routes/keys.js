// require('dotenv').config
const bcrypt = require("bcryptjs");
const express = require('express')
const crypto = require('crypto');
const router = express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.js')
const User = require('../models/user')
const JWT_SECRET_TOKEN = 'd634ac61ded6906fa87a122463e1df846cee88da8ad713c306dfb39db204e77cd6101047d4e24cf5ed396559a68a261213c8cd3cea5cfdd143a6b5b8d0772189'
const stringToEncrypt = 'OurProjectIsBestAndElonMuskWillSwapOurCompanyWithHisTesla';
const axios = require('axios');

async function generateKey() {
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

function encrypt(string, key){
    return crypto.publicEncrypt(
        {
            key: key.publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(string)
    ).toString('base64');
}

function decrypt(encrypted_string, key)
{
    return  crypto.privateDecrypt(
        {
            key: key.privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        encrypted_string
    ).toString('utf-8');
}





router.get('/nodes/all', (req, res) => {
    var response = {
        status: 100,
        data: []
    }
    console.log("ok")
    User.find()
    .then(users => {
        response.data = users
        response.status = 200
        res.json(response)
    })
    .catch(err => {
        response.status = 500
        response.data = err
        res.json(response)
    })
})

router.post('/nodes/register', async (req, res) => {
    const NodeId = req.body.NodeId
    let response = {
        msg: '',
        status: 100
    }
    let key= await generateKey()
    let PrivateKey = key.privateKey
    let PublicKey = key.publicKey
    if(!NodeId||!PrivateKey||!PublicKey){ 
        response.msg = "Empty Invalid"
        response.status = 400
    }
    else {
        const node = new User({
            NodeId,PrivateKey,PublicKey
        })
        await node.save()
        .then(node => {
            response.msg = "Empty node created a with id " + node.NodeId
            response.status = 200
        })
        .catch(err => {
            response.msg = "Error creating node"
            response.status = 400
        })
    }
    return res.json(response);
});

router.post('/user/signup', async (req, res) => {
    let response = {
        msg: '',
        status: 100
    }
    const NodeId= req.body.NodeId
    if (!NodeId) {
        response.msg = "Empty Invalid"
        response.status = 400
        return res.json(response)
    }
    else{
        var newww={
            UserName:req.body.UserName,
            Password:req.body.Password,
            MobileNumber:req.body.MobileNumber,
            Email:req.body.Email
        }
        newww.Password = await bcrypt.hash(req.body.Password, 10)
        User.findOneAndUpdate({NodeId: NodeId,UserName:null}, {$set: newww}, {new: false})
        .then(user => {
            if(!user){
                response.msg = "Node already associated with a user"
                response.status = 400
                return res.json(response)
            }
            else{
                response.msg = "User created"
                response.status = 200
                return res.json(response)
            }
        })
        .catch(err => {
            response.msg = "Error creating user"
            response.status = 400
            return res.json(response)
        })
    }
})

router.post('/user/login', async (req, res) => {
    let response = {
        msg: '',
        status: 100,
        token: ''
    }
    const NodeId= req.body.NodeId
    const UserName = req.body.UserName
    const Password = req.body.Password
    if (!NodeId||!UserName || !Password) {
        response.msg = "Empty Invalid"
        response.status = 400
        return res.json(response)
    }
    else {
        User.findOne({ UserName: UserName , NodeId: NodeId}, (err, user) => {
            if (err) {
                response.msg = "Error finding user"
                response.status = 400
                return res.json(response)
            }
            else if (!user) {
                response.msg = "Invalid UserName"
                response.status = 400
                return res.json(response)
            }
            else {
                bcrypt.compare(Password, user.Password,(err,isMatch) => {
                    if (err) {
                        response.msg = "Error finding user"
                        response.status = 400
                        return res.json(response)
                        }
                    else if (!isMatch) {
                        response.msg = "Invalid Password"
                        response.status = 400
                        return res.json(response)
                    }
                    else {
                        const usertokenidentity = {
                            NodeID: user.NodeId,
                            UserName: user.UserName,
                            MobileNumber: user.MobileNumber,
                            Email: user.Email,
                            PrivateKey: user.PrivateKey
                        }
                        const Token = jwt.sign(usertokenidentity, JWT_SECRET_TOKEN)
                        res.cookie('user_session', Token, { httpOnly: true });
                        response.msg = "User logged in"
                        response.status = 200
                        response.token = Token
                        return res.json(response)
                    }
                })
            }
        })
    }
    // return res.json(response)
})

router.post('/user/jwttoken', (req, res) => {
    let response = {
        msg: '',
        token: "",
        status: 100
    }
    if (!req.body.NodeId) {
        console.log("User is Verified")
        response.msg = "User is Verified";
        // jwt token
        const usertokenidentity = { NodeId: req.body.NodeID, MobileNumber: req.body.MobileNumber,Email:req.body.Email, PrivateKey: req.body.PrivateKey }
        const Token = jwt.sign(usertokenidentity, process.env.JWT_SECRET_TOKEN)
        res.cookie('user_session', Token, { httpOnly: true });
        response.token = Token
        console.log(`User session token is: ${Token}`)
        response.status = 200
    } else {
        console.log("Invalid login")
        response.msg = "Invalid user";
        response.status = 400
    }
    return res.json(response)
})

router.post('/user/logout', (req, res) => {
    let response = {
        msg: 'Bye',
        status: 200
    }
    res.clearCookie("user_session");
    return res.json(response)
})



// router.post('/data/send', async (req, res) => {
//     let response = {
//         msg: '',
//         data : '',
//         user: '',
//         status: 100
//     }
//     let data = req.body
//     // console.log(data)
//     let fl=false
//     await User.findOne({ NodeId: data.NodeId })
//     .then(user => {
//         if (!user) {
//             response.msg = "Not registered"
//             response.status = 400
//             return res.json(response)
//         }
//         else {
//             fl=true
//             console.log(data)
//             response.user = user
//             // data.data.field1 = encrypt(data.data.field1, user.PublicKey)
//             console.log(data)
//             response.data = data
//             return res.json(response)
//         }
//     })
//     .then((ttt) => {
//         console.log(ttt.statusCode)
//         if(fl){
//             axios.get(`https://api.thingspeak.com/update?api_key=2A1DMVLKBR41Q3PT&field1=`+data.data.field1)
//             response.msg = "Data sent"
//             response.status = 200
//             .then(res => {
//                 if(!res || res.data.status == 400 ){
//                     response.msg = "No nodes found"
//                     response.status = 400
//                     return res.json(response)
//                 }
//                 else{
//                     response.user = "archit"
//                     response.status = 200
//                     return res.json(response)
//                 }
//             })
//             .catch(err => {
//                 response.msg = "Error finding nodes"
//                 response.status = 400
//                 return res.json(response)
//             })
//             // return res.json(response)
//         }
//         else{
//             response.msg = "Error finding user1"
//             response.status = 400
//             return res.json(response)
//         }
//     })
//     .catch(err => {
//         response.msg = "Error finding user2"
//         response.status = 400
//         return res.json(response)
//     })

//     // if(fl){
//     //     console.log(data)
//     //     await axios.get(`https://api.thingspeak.com/update?api_key=2A1DMVLKBR41Q3PT&field1=`+data.data.field1)
//     //     .then(res => {
//     //         if(!res || res.data.status == 400 ){
//     //             response.msg = "No nodes found"
//     //             response.status = 400
//     //             return res.json(response)
//     //         }
//     //         else{
//     //             response.data = res.data.data
//     //             response.status = 200
//     //             return res.json(response)
//     //         }
//     //         return res.json(response)
//     //     })
//     //     .catch(err => {
//     //         response.msg = "Error finding nodes"
//     //         response.status = 400
//     //         return res.json(response)
//     //     })
//     // }
//     // else{
//     //     response.msg = "Error finding user"
//     //     response.status = 400
//     //     return res.json(response)
//     // }
//     // some shit to send data to the m2m
//     // return res.json(response)
// })

// router.post('/data/recieve', auth, (req, res) => {

//     let response = {
//         msg: '',
//         data : '',
//         status: 100
//     }
    
//     // some shit to send data from node
//     return res.json(response)
    
// })


module.exports = router

