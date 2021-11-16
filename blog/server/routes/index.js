const Router = require("express").Router();

Router.use('/register', require('./API/Register'));
Router.use('/login', require('./API/Login'));
Router.use('/post', require('./API/Post'));
Router.use('/fullPost', require('./API/FullPost'));
Router.use('/check', require('./API/Check'));
Router.use('/profile', require('./API/Profile'));

module.exports = Router;