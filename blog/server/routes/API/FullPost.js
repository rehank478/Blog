const Post = require('../../model/Post');

const Router = require('express').Router();

Router.post('/', (req,res) => {
    Post.findOne({path: req.body.id}).then(response => {
        res.send({post: response});
    }).catch(err => {
        res.send({message : err.message});
    });
});

module.exports = Router;