const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {
    // console.log(req);
    const token = req.header('token');
    try{
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        next();
    }catch(err){
        res.send({error: "Invalid Token"});
    }
}