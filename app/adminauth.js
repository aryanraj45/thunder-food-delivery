function adminauth (req , res , next) {
   
    if(req.session.isAdmin===true)
       return next()
    return res.redirect('/')

}


module.exports = adminauth