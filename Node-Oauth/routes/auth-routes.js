const router = require('express').Router();
const passport = require('passport');

router.get('/login',(req, res)=>{
    res.render('login',{user :req.user});
} )

router.get('/logout',(req, res)=>{
    req.logout();
    res.redirect('/');
} )

router.get('/google',passport.authenticate('google', { scope: 
    ['profile'] })
    );

router.get('/google/redirect',passport.authenticate('google'),(req, res)=>{
    //this res.send(req.user will send all the information releted to the user like name , id , mongo db id )
    //res.send(req.user)
    res.redirect('/profile/');
})

module.exports = router;