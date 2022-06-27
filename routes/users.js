const req = require('express/lib/request');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const res = require('express/lib/response');
const User = require('../models/User');

//update user
router.put("/:id", async (req, res) => {
    if (req.body.userID === req.params.id || req.body.isAdmin) { //if ID matches or user is admin
        if (req.body.password){ //if user wants to change password
            try { //rehash password
                const salt = await bcrypt.genSalt(13);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err) {
                return res.status(500).json(err);
            }
        } 
        try { //update user info
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body, //update all the fields in the database to mongoDB
            });
            res.status(200).json("Account updated");
        } catch(err){
            res.status(500).json(err);
        }
    } 
    else {
        return res.status(403).json("You can only update your account!")
    }
});
    
//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userID === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted successfully");
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can only delete your own account!")
    }
})

//get a user
router.get("/", async (req, res) => {
    const userID = req.query.userID;
    const username = req.query.username;
    try {
        const user = userID 
        ? await User.findById(req.query.userID)
        : await User.findOne({username: username}); 
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch(err) {
        res.status(500).json(err);
    }
})

//follow a user
router.put("/:id/follow", async (req, res) => {
    if(req.body.userID !== req.params.id){
        try {
            const currID = req.body.userID;
            const otherID = req.params.id;
            const otherUser = await User.findById(otherID);
            const currUser = await User.findById(currID);
            if (!otherUser.followers.includes(currID)){
                await otherUser.updateOne({$push:{ followers: req.body.userID }});
                await currUser.updateOne({$push:{ following: req.params.id }});
                res.status(200).json("user has been followed")
            } else{
                res.status(403).json("you already follow this user");
            }
        } catch(err){
            send500(err);
        }
    } else{
        res.status(403).json("you cant follow yourself");
    }
})

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userID !== req.params.id){
        try {
            const currID = req.body.userID;
            const otherID = req.params.id;
            const otherUser = await User.findById(otherID);
            const currUser = await User.findById(currID);
            if (otherUser.followers.includes(currID)){
                await otherUser.updateOne({$pull:{ followers: req.body.userID }});
                await currUser.updateOne({$pull:{ following: req.params.id }});
                res.status(200).json("user has been unfollowed")
            } else{
                res.status(403).json("you already dont follow this user");
            }
        } catch(err){
            send500(err);
        }
    } else{
        res.status(403).json("you cant unfollow yourself");
    }
})

module.exports = router;