module.exports = function(app, User, help) {
    app.get('/home',help.redirectLogin, (req,res) => {
        User.findOne({_id:req.session.userId},(err,result) => {
            if(err) throw err;
            res.render('home',{walletamount: result.walletAmount});
        });
    });
}