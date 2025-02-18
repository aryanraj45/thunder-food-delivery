module.exports = function(app, User, help) {
    //LOGIN GET ROUTE
    app.get('/login',help.redirectHome,(req,res) => {
        res.render('login');
    });

    app.post("/login",(req,res) => {
        var eid = req.body.emailid;
        console.log(eid);
        var pin = req.body.password;
        User.findOne({emailid: eid},(err,result) => {
            if(err) throw err;
            if(result) {
                if(help.validatePassword(result.password, pin)) {
                    req.session.userId = result._id;
                    req.session.isAdmin = result.isAdmin;
                    if(req.session.isAdmin) {
                        res.redirect('/adminorders');
                    } else {
                        res.redirect('/home'); 
                    }
                    // res.send("LOGGED IN")
                } else { //WRONG PASSWORD HAS BEEN USED
                    res.redirect('/login');
                }
            } else { //THE USER DOES NOT EXIST
                res.redirect('/register');
                // res.send("NO ACCOUNT FOUND")
            }
        });
    });
}