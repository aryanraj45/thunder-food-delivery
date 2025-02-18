module.exports = function(app, help) {
    
    app.get('/logout',help.redirectLogin,(req,res) => {
        req.session.cookie.maxAge=0;
        res.redirect('/')
    });
}