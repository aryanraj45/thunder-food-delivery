var path=require('path')
module.exports = function(app, help) {
    //THE ROOT ROUTE
    app.get("/",help.redirectHome, function(req,res){
        const { userId } = req.session;
        res.render('index.ejs')
    });
}