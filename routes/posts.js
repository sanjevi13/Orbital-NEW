const router = require('express').Router();
const Post = require('../models/Post');
const User = require("../models/User");

//create post
router.post("/", async (req, res)=>{
    console.log(req.body);
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(err) {
        res.status(500).json(error);
    }
})

//update post
router.put("/:id", async (req, res) => { //id is postID
    try {
        const post = await Post.findById(req.params.id);
        if (post.userID === req.body.userID){
            await post.updateOne({$set: req.body})
            res.status(200).json("the post has been updated");
        } else{
            res.status(403).json("you can only update your own post")
        }
    } catch(err){
        res.status(500).json(error);
    }
})
//delete post
router.delete("/:id", async (req, res) => {//id is postID
    try {
        const post = await Post.findById(req.params.id);
        if (post.userID === req.body.userID){
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else{
            res.status(403).json("you can only delete your own post");
        }
    } catch(err){
        res.status(500).json(error);
    }
})

//like/dislike post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userID)){
            await post.updateOne({$push:{likes: req.body.userID}});
            res.status(200).json("The post has been liked");
        } else{
            await post.updateOne({$pull:{likes: req.body.userID}});
            res.status(200).json("The post has been disliked");
        }
    } catch(err){
        res.status(500).json(error);
    }
});

//get post
router.get("/:id", async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err){
        res.status(500).json(err);
    }
})

//get all posts of users followed by current user
router.get("/timeline/:userID", async (req, res)=>{
    try{
        const currentUser = await User.findById(req.params.userID);
        //console.log(currentUser);
        const userPosts = await Post.find({userID: currentUser.id});
        //console.log(`userPosts: ${userPosts}`);
        const friendPosts = await Promise.all( //returns an array of the results
            currentUser.following.map( friendID => {
                return Post.find({userID: friendID})
            })
        );
        console.log(`friendPosts:${friendPosts}`);
        res.status(200).json(userPosts.concat(...friendPosts));
        //res.status(200).json(userPosts);
    } catch(err){
        res.status(500).json(err);
    }
})

//get all of user's posts
router.get("/profile/:username", async (req, res)=>{
    try{
        const user = await User.findOne({username: req.params.username});
        const posts = await Post.find({userID: user._id});
        res.status(200).json(posts);
    } catch(err){
        res.status(500).json("YOU ARE GAY");
    }
})

module.exports = router;