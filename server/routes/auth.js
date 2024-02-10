const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
// const nodemailer = require('nodemailer');

// const Mail = async 
passport.use(new GoogleStrategy({
    clientID:process.env.GoogleClientId,
    clientSecret:process.env.GoogleClientSecret,
    callbackURL:process.env.GoogleCallbackURI   
    },
    async function(accessToken,refreshToken,profile,done) {
        console.log(profile);
        // return cb(err,user); 
        try {
            let user = await User.findOne({googleId:profile.id});
            // console.log(user.googleId);
            if(user){

                // console.log("hello");
                done(null,user);
            }else{
                const newUser = new User({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    firstName:profile.name.givenName,
                    lastName:profile.name.familyName,
                    profileImage:profile.photos[0].value
                })
                const saveUserData = await newUser.save();
                // console.log("hello1");
                done(null,user);
            }
        } catch (error) {
            console.log("Error in Google Auth ");
            console.log(error.message);
        }
    }
))

router.get(
    '/auth/google',
    passport.authenticate("google",{scope:["email","profile"]})
);

router.get(
    '/auth/google/callback',
    passport.authenticate("google",{
        successRedirect:'/dashboard',
        failureRedirect:'/login-failure'
    })
)

router.get('/login-failure',(req,res)=>{
    res.send("Something Went Wrong...");
})

//serialize the user
passport.serializeUser((user,done)=>{
    // console.log("serializeUser");
    done(null,user.id);
})

//deserialize the user
passport.deserializeUser(async (id,done)=>{
    try {
        const user = await User.findById(id);
        // console.log("Deserialize User :::::::::::::::::::"+user);
        done(null,user);
    } catch (error) {
        console.log("Bhoola");
        done(err,null);
    }
})

router.route('/logout').get((req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            res.send("Error in logging Out")
        }else{
            res.redirect('/');
        }
    })
})

module.exports = router;