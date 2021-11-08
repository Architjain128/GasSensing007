require('dotenv').config
const jwt = require('jsonwebtoken')

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
        jwt.verify(token,process.env.JWT_SECRET_TOKEN,(err,user)=>{
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