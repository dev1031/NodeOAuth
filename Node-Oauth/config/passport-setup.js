//this setup is specifically using the passport for the user Oauth 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const keys = require('./keys');
const User = require('../models/models-users');

//user.id is not the same as googleid bcz every user will have the id
//so we are using the mongodb id that is created by the mongo db
//dont confuse _id of mongo db
// by using serilize we are sending the id only
passport.serializeUser((user,done)=>{
    done(null, user.id);
    
})

//to decode the id we will use the deserilize and pass the id to it so we can 
//identify the user
//id is given by the mongo db 
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
})

passport.use(
    new GoogleStrategy({
    clientID:keys.google.clientID ,
    clientSecret: keys.google.clientSecret,
    callbackURL: "http://localhost:5000/auth/google/redirect"

    },function(accessToken, refreshToken, profile,done){
        //before saving the data we will check wether the user existed or not 
        //console.log(profile)
        User.findOne({googleId:profile.id})
        .then((currentUser)=>{
            if(currentUser){
                //user exist
                console.log('user:'+ currentUser);
                //next line is done method that will pass the control to the 
                //seriallizeUser so that we can store the user data there 
                //null here is error if any 
                done(null,currentUser)
            }else{
                //user don't exist
                new User({
                    username:profile.displayName,
                    googleId:profile.id,
                    thumbnail:profile._json.picture
                }).save()
                .then((newUser)=>{
                    console.log('newUser:'+ newUser);
                    //same as above so the information of the new user can pass to the 
                    //serialize and the data can be store
                    done(null, newUser)
                    //again null is for error if any;
                })
            }
        })
       
    }));