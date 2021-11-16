const User = require('../../model/User');
const bcrypt = require('bcrypt');

const Router = require('express').Router();

Router.post('/', (req,res) => {
    User.findOne({email: req.body.email}).then(async (response) => {
        if(response) res.send("email already Exist");
        else{
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
                numberOfPosts: 0
            });

            newUser.save().then(response => {
                res.send({id: response._id});
            }).catch(err => {
                res.send({message: err.message});
            })
        }
    }).catch(err => {
        res.send({message: err.message});
    });
});

module.exports = Router;