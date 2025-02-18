const express = require('express');
const mongose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');
const path = require('path');
const cartcontroller = require('./app/cartcontroller') ;
const ordercontroller = require('./app/ordercontroller') ;
const adminordercontroller = require('./app/adminordercontroller') ;
const menucontroller = require('./app/menucontroller') ;
const adminauth = require('./app/adminauth')
const flash = require('express-flash')
const envar = require('./config');
const MongoDbStore = require('connect-mongo').default;
const razorpay = require('razorpay');
const shortid = require('shortid');
var instance = new razorpay({
    key_id: envar.RAZOR_PAY_KEY_ID,
    key_secret: envar.RAZOR_PAY_KEY_SECRET
});
var app = express();
app.use(express.json())
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
mongose.connect(envar.MONGODB,{
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true 
});
let mongoStore =  MongoDbStore.create({
    mongoUrl: envar.MONGODB, 
    collectionName: 'sessions' 
  })
app.use(session({
    name: envar.SESS_NAME,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    secret: envar.SESS_SECRET,
    cookie: {
        maxAge: envar.SESS_LIFETIME,
        sameSite: true,
        secure: false
    }
}));
app.use(flash())
app.use((req,res,next) => {
    res.locals.session = req.session ;
    res.locals.user = req.user ;
    next()
})
const User = require('./models/user');
const help = require('./utils/helper');
require('./routes/index')(app, help);
require('./routes/login')(app, User, help);
require('./routes/home')(app, User, help);
require('./routes/register')(app, User, help);
require('./routes/logout')(app, help);
app.get('/cart' , help.redirectLogin, cartcontroller().index)
app.post('/updatecart', help.redirectLogin, cartcontroller().update)
app.get('/menu' , help.redirectLogin, menucontroller().index)
app.listen(process.env.PORT || envar.PORT, ()=> {
    console.log("SERVER STARTED at " , envar.PORT);
})
app.post('/orders', help.redirectLogin, (req,res)=>{
    var options = {
        amount: req.session.cart.totalprice*100,  
        currency: "INR",
        receipt: shortid.generate()
    };
    instance.orders.create(options, function(err, order) {
        var useremail="";
        var num="";
        User.findOne({_id: req.session.userId},(err, result)=>{
            if(result) {
                useremail = result.emailid;
                num=result.phoneno;
            }
        })
        res.render('paymentpage', {orderid:order.id, useremail: useremail, phone: num})
    });
})
app.post('/payment/success', help.redirectLogin, ordercontroller().index) ;
app.get('/payment/success', help.redirectLogin, (req,res)=>{
    res.render('placed');
})
app.get('/adminorders' , adminauth, adminordercontroller().index) ; 