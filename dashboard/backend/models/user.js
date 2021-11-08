const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        NodeId:{ type: String, required: true },
        PrivateKey:{ type: String, required: true },
        PublicKey:{ type: String, required: true },
        UserName:{ type: String},
        Password:{ type: String},
        Email:{ type: String},
        MobileNumber:{ type: String},
    }
)

module.exports = mongoose.model('user', User)