const verify = require("../../middleware/verify");

const Router = require("express").Router();

Router.get('/', verify ,(req,res) => {
    res.status(200).send();
});

module.exports = Router;