require('dotenv').config
const bcrypt = require("bcryptjs");
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.js')
const User = require('../models/user')

// gen key
// gen node
// add user(signup)
// login 
// enctypt data
// decrypt data
// get data


function generate_keys() {
    return Math.random().toString(10).substring(2, 2 + parseInt(process.env.PATIENT_ID_LEN));
}

router.get('/nodes/all', (req, res) => {
    PatientReg.find((err, user) => {
        if (err) { throw err; }
        else { res.status(200).json(user); }
    })
})

router.post('/nodes/register', async (req, res) => {
    const NodeId = req.body.NodeId
    let response = {
        msg: ''
    }
    let PrivateKey = generate_keys()
    let PublicKey = generate_keys()
    if(!NodeId||!PrivateKey||!PublicKey){ 
        response.msg = "Empty Invalid"
        res.status(400).json(response)
    }
    else {
        const node = new User({
            NodeId,PrivateKey,PublicKey
        })
        await node.save()
        .then(node => {
            response.msg = "Empty node created a with id" + node.NodeId
            console.log(msg)
            return res.status(200).json(response);
        })
        .catch(err => {
            response.msg = "Error creating node"
            console.log(msg)
            return res.status(400).json(response);
        })
    }
});

router.post('/user/signup', async (req, res) => {
    let response = {
        msg: '',
    }
    const NodeId= req.body.NodeId
    if (!NodeId) {
        response.msg = "Empty Invalid"
        res.status(400).json(response)
    }
    else{
        var newww={
            UserName:req.body.UserName,
            Password:req.body.Password,
            MobileNumber:req.body.MobileNumber,
            Email:req.body.Email
        }
        newww.Password = bcrypt.hash(req.body.Password, 10)
        User.findOneAndUpdate({ NodeId: NodeId },newww,(user,err)=>{
            if(err){
                response.msg = "Error creating user"
                res.status(400).json(response)
            }
            if (!user) {
                response.msg = "Invalid NodeId"
                res.status(400).json(response)
            }
            else {
                response.msg = "User created"
                res.status(200).json(response)
            }
        })
    }
})

router.post('/user/login', async (req, res) => {
    let response = {
        msg: '',
    }
    const UserName = req.body.UserName
    const Password = req.body.Password
    if (!UserName || !Password) {
        response.msg = "Empty Invalid"
        res.status(400).json(response)
    }
    else {
        User.findOne({ UserName: UserName }, (err, user) => {
            if (err) {
                response.msg = "Error finding user"
                res.status(400).json(response)
            }
            else if (!user) {
                response.msg = "Invalid UserName"
                res.status(400).json(response)
            }
            else {
                const isMatch = bcrypt.compare(Password, user.Password)
                if (!isMatch) {
                    response.msg = "Invalid Password"
                    res.status(400).json(response)
                }
                else {
                    const usertokenidentity = {
                        NodeID: user.NodeId,
                        UserName: user.UserName,
                        MobileNumber: user.MobileNumber,
                        Email: user.Email,
                        PrivateKey: user.PrivateKey,
                    }
                    const Token = jwt.sign(usertokenidentity, process.env.JWT_SECRET_TOKEN)
                    res.cookie('user_session', Token, { httpOnly: true });
                    res.status(200).send(response)
                }
            }
        })
    }
})

router.post('/user/jwttoken', (req, res) => {
    let response = {
        msg: '',
        token: ""
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
        // 
        res.status(200).send(response)
    } else {
        console.log("Invalid login")
        response.msg = "Invalid user";
        res.status(400).send(response)
    }
})

router.post('/user/logout', (req, res) => {
    res.clearCookie("user_session");
    res.status(200).send("Bye")
})

router.post('/data/send', auth, (req, res) => {

    let response = {
        msg: '',
        data : ''
    }
    // some shit to send data to dash board
    res.status(200).send(response)
})

router.post('/data/recieve', auth, (req, res) => {

    let response = {
        msg: '',
        data : ''
    }
    // some shit to send data from node
    res.status(200).send(response)
})


module.exports = router