const isAuthenticated = (req,res,next)=>{
    if(req.user) next();
    res.send("I'm Daemon");
}

module.exports = isAuthenticated;