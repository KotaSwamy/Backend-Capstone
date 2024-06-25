const express = require('express');
const User = require('../models/user.js');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const validateNewUser = require('../middlewares/validateNewUser.js')

router.get('/', (req,res) => {
    res.json({
        status: 'success',
        message: 'user route is working fine',
        data : user
    })
})

router.get('/userData', async (req,res) => {
    const userdata = await User.find()
    try{
        res.json({
            status: 'success',
            data: userdata,
        })
    }catch{
        res.json({
            status:'failed',
            message:' error happend to get User',
        })
    }
    })


router.post('/register', validateNewUser, async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const existingUser = await User.findOne({ email: email });

            if (existingUser) {
                return res.status(400).json({
                    message: 'User already exists, please use another email address',
                });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
                    name,
                    email,
                    password: hashedPassword,    
                });

                await newUser.save();
                res.status(201).json({
                    message: 'User created successfully',
                    user: newUser
                });
            }
        } catch (error) {
            res.status(400).json({
                message : 'error Creatting User',
            })
        }
});

router.post('/login', async (req,res) => {
    const { email, password } = req.body
    try{
        const existingUser = await User.findOne({email: email}) 
            if(existingUser){
                const isPasswordCorrect = await bcrypt.compare(password, existingUser.password );
                
                if(isPasswordCorrect) {
                    const token = jwt.sign(
                        { email: existingUser.email },
                        'secret',
                        { expiresIn : '1hr' }

                    );
                    res.status(200).json({
                        message: 'login successful',
                        Email: existingUser.email,
                        token

                    })
                }
                else{
                    res.status(400).json({
                        message: 'invalid credentials '
                    })

                }                           
            }else{
                res.status(400).json({
                    message: 'Username not Found',
                    email: email
                })
            }  
    }
    catch(error) {
        res.status(500).json({
            message: 'Login Failed'
        })
    }

})





module.exports = router