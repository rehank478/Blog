const Post = require('../../model/Post');
const Router = require('express').Router();

Router.get('/', (req,res) => {
    Post.find().then(response => {
        res.send({posts: response});
    }).catch(err => {
        res.send({message: err.message});
    })
});


Router.post('/', (req,res) => {
    // console.log(req.body);
    let path = req.body.title.trim().replace(/\s+/g, '_');
    let title = req.body.title.trim().replace(/\s+/g, ' ');
    Post.findOne({path: path}).then(response => {
        if(response) res.send({error: "Post name already taken"});
        else{
            const newPost = new Post({
                title: title,
                body: req.body.body,
                author: req.body.author,
                path: path,
                numberOfCounts: 0
            });

            newPost.save().then(result => {
                res.send({message: "Post added Successfull"});
            }).catch(err => {
                res.send({error: err.message});
            })
        }
    })
    
});

Router.delete('/', (req,res) => {
    Post.deleteOne({path: req.header('id')}).then(response => {
        res.send({message: "Post Deleted Successfully"});
    }).catch(err => {
        res.send(err.message);
    })
});

Router.put('/', (req,res) => {
    // console.log(req.body);
    Post.findOneAndUpdate({path: req.body.id}, {$set: {body: req.body.body}}).then(response => {
        if(response) res.send({message: "Post updated Successfully"});
        else res.send({error: "Something went wrong Try after sometime"});
    }).catch(err => {
        res.send({error: err.message});
    });
})

module.exports = Router;