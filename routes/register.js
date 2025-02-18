const path = require('path');
const md5 = require('md5');
module.exports = function(app, User, help) {
    //register GET ROUTE
    app.get('/register',help.redirectHome,(req,res)=>{
        res.render('register');
    });
    app.post('/register',(req,res) => {
        let pas = req.body.password;
        User.create({
            emailid: req.body.emailid,
            password: md5(pas),
            phoneno: req.body.phoneno,
            hostel_room: (req.body.hostel_room)?req.body.hostel_room:"dayscholar",
            rollno: req.body.rollno,
            isAdmin: false,
            walletAmount: 500,
        });
        res.redirect('/login');
    });
}