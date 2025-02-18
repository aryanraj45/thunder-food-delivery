const md5 = require('md5');
const User = require('../models/user')
module.exports.redirectHome = function(req,res,next) {
    if(req.session.userId) {
        User.findOne({_id: req.session.userId},(err,result)=>{
            res.redirect('/home')
        })
    } else {
        next()
    }
}
module.exports.redirectLogin = function(req,res,next) {
    if(!req.session.userId) {
        res.redirect('/login')
    } else {
        next()
    }
}

module.exports.validatePassword = function(hash, plain) {
    if(hash===md5(plain)) return true;
    else return false;
}