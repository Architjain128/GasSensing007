require('dotenv').config
const jwt = require('jsonwebtoken')
const JWT_SECRET_TOKEN = 'd634ac61ded6906fa87a122463e1df846cee88da8ad713c306dfb39db204e77cd6101047d4e24cf5ed396559a68a261213c8cd3cea5cfdd143a6b5b8d0772189'

module.exports = function jwtauthpatient(req,res,next){
    const token = req.cookies.user_session
    let response={
        msg:'',
        data:""
    }
    
    if(token == null){
        response.msg="User not authorized for this request";
        return res.status(400).send(response)
    }
    else{
        jwt.verify(token,JWT_SECRET_TOKEN,(err,user)=>{
            if(!user){
                response.msg="User not authorized token hampered";
                return res.status(400).send(response)
            }
            else{
                if(err){throw err;}
                else{
                    req.user = user
                    console.log(`user is: ${user}`)
                    next()
                }
            }
        })
    }
}