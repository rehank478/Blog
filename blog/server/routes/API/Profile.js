const Post = require('../../model/Post');
const User = require('../../model/User');

const Router = require('express').Router();

Router.post('/', (req,res) => {
    User.findOne({email: req.body.email}).then(response => {
        if(response){
            Post.find({author: req.body.email}).then(result => {
                if(result) res.send({user: response, posts: result});
                else res.send({user: response, posts: []});
            }).catch(err => {
                res.send(err.message);
            })
        }
        else res.send({error : "No user Found"});
    }).catch(err => {
        res.send(err.message);
    })
    
})

module.exports = Router;