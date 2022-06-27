const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//get  
//post
//register
router.post('/register', async (req,res) => {
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and response
        const user = await newUser.save()
        res.status(200).json(user); 
    } catch(err){
        res.status(500).json(err);
    }
});

//login 
router.post('/login', async (req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        var validPassword = null;
        if (user) { //if user exist then update validPassword
            validPassword = await bcrypt.compare(req.body.password, user?.password);
            console.log(validPassword);
        }        
        if (!user) {
            res.status(404).json("user not found");
        } 
        else if (!validPassword){           
            res.status(404).json("wrong password");
        }
        else{
            req.session.user = user; //create session
            res.status(200).json(user); 
        }
    } catch(err){
        console.log(err)
        res.status(500).json(err);
    }
})

//check if user is logged in
router.get('/login', (req, res)=>{
    try {
        if (req.session.user){
            res.send({loggedIn: true, user: req.session.user});
        } else {
            res.send({loggedIn: false});
        }
    } catch(err){
        res.status(500).json(err);
    }
})
module.exports = router;