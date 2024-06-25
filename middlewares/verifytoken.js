const jwt = require('jsonwebtoken')

const verifytoken =  (req,res,next) => {
    try{
    const token = req.header('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    console.log(decoded)
    req.user = decoded;
    next();
    }
    catch{
        res.status(400).json({
            message: 'Token Not Valid'
        })
    }
}

module.exports = verifytoken;