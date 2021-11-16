const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../model/User');
const bcrypt = require('bcrypt');

Router.post('/', (req,res) => {
    User.findOne({email: req.body.email}).then(response => {
        if(!response) res.send("No user Found");
        else{
            bcrypt.compare(req.body.password, response.password).then(result => {
                if(!result) res.send("Password not matched");
                else{
                    const token = jwt.sign({email: req.body.email},process.env.SECRET_TOKEN, {
                        expiresIn: '2d'
                    });
                    res.send({token: token, email: req.body.email});
                }
            }).catch(err => {
                res.send({message: err.message});
            });
        }
    }).catch(err => {
        res.send({message: err.message});
    })

});


module.exports = Router;