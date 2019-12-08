const router = require('express').Router();

//writing the middleware so f the user is not logged in it will not throw an error
const authCheck = (req, res, next)=>{
    if(!req.user){
        //this code will execute if the user is not logged in 
        res.redirect('/auth/login');
    }else{
        next();
    }
}

router.get('/',authCheck,(req, res)=>{
    //res.send('view a logged in this is your profile-'+ req.user.username)
    //this user name is coming from /google/redirect
    res.render('profile',{user : req.user});
})

module.exports = router;