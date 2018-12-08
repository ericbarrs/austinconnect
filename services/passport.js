const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("user");
//serialize user

passport.serializeUser((userProfile, done) => {
  done(null, userProfile.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
//use google strategy from passport oauth20
// passport.use(new GoogleStrategy({
//     //clientID and clientSecret from google api
//     clientID:keys.googleClientID || process.env.googleClientID,
//     clientSecret:keys.googleClientSecret || process.env.googleClientSecret,
//     //route that should be called back on from google api.
//     callbackURL: '/auth/google/callback'
//     },(accessToken,refreshToken,profile,done)=>{
//         User.findOne({googleId: profile.id})
//         .then(user => {
//             if(user){
//                 console.log('user already exists')
//                 done(null, user);
//             }else{
//                 new User({googleId: profile.id}).save()
//                 .then(userProfile => done(null, userProfile))
//             }
//         }).catch(err => console.log(err))
//     }
// ))

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
      passReqToCallback: true
    },
    (req, username, password, done) => {
      User.findOne({ userName: username }).then(userProfile => {
        console.log(userProfile + " line 50");
        userProfile.validPassword = function(password) {
          if (userProfile.password === password) {
            return true;
          }
        };
        if (!userProfile) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (!userProfile.validPassword(password)) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, userProfile);
      });
    }
  )
);
