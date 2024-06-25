const jwt = require('jsonwebtoken')

const  validateNewUser = (req,res,next) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        res.status(401).json({message : ''});
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRegex.test(email)) {
        return res.status(401).json({message : 'please provide all required fields'});
    }
    else{
        next();
    }
}
module.exports = validateNewUser;