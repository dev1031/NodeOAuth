const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

//for session both cookieSession and passport
const cookieSession = require('cookie-session');
const passport = require('passport');

var app = express();
var port = 5000;

app.set('view engine', 'ejs');

//for session
//maxage tell u the lifetime of the session and here it is one day
//keys will help u the encript  the cookie that we send  from serliztion
// we can send any numbers of keys
//we are also initializing the passport and session
app.use(cookieSession({
  maxAge : 24*60*60*1000,
  keys : [keys.session.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());

//connecting mongo db with mlab
mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true, useUnifiedTopology: true  }, ()=>{console.log('connected to mongo db')});

//this must be in last otherwise you are in trouble
app.use('/auth' , authRoutes);
app.use('/profile',profileRoutes);
app.get('/',(req, res)=>{
    res.render('home',{user :req.user});
    //second perameter is for checking porpose so we can say that it is  logged in 
  })

app.listen(port,()=>{
      console.log( `Server is running at the PORT ${port}`)
  })