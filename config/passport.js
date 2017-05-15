/**
 * Created by olegl on 15.05.2017.
 */
let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy  = require('passport-facebook').Strategy;
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let TwitterStrategy = require('passport-twitter').Strategy;
let bodyParser = require('body-parser');
const configureAuth = require('./auth');
const mongoose = require('mongoose');
let User = require('../models/user');
module.exports =function (passport) {
    mongoose.Promise = global.Promise;
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById({
            id, function(err, user){
                done(err, user)
            }
        })
        });

        passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email,password, done) {

            process.nextTick(function () {
                User.findOne({'local.email':email},function (err,user) {
                    if(err) {return done(err);}
                    if(user) {return done(null,false, req.flash('signupMessage','Email exist'));}
                    else {

//validation

                     let newUser = new User();
                     newUser.local.email = email;
                     newUser.local.username = email;
                     newUser.local.password = password;
                     newUser.save(function (err){
                         if(err) throw err;
                         return done(null,newUser);

                     })
                     ;}
                });

            })
        }
        )
        );

passport.use(new FacebookStrategy({
    clientID: configureAuth.facebookAuth.clientID,
    clientSecret: configureAuth.facebookAuth.clientSecret,
    callbackURL:configureAuth.facebookAuth.callbackURL},
    function (accessToken, refreshToken,profile,done) {
        process.nextTick(function () {
            User.findOne({'facebook.id':profile.id},function (err,user) {
                if(err) return done(err);
                if(user) {return done(null, user)}
                else {
                    console.log(profile);
                    newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.username = profile.displayName;
                    newUser.save();

                }
            })
        })
    }
    
    
    ));
passport.use(new GoogleStrategy({
    clientID: configureAuth.googleAuth.clientID,
    clientSecret: configureAuth.googleAuth.clientSecret,
    callbackURL:configureAuth.googleAuth.callbackURL},
    function (accessToken, refreshToken,profile,done) {
        process.nextTick(function () {
            User.findOne({'google.id':profile.id},function (err,user) {
                if(err) return done(err);
                if(user) {return done(null, user)}
                else {
                    console.log(profile);
                    newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.google.token = accessToken;
                    newUser.google.username = profile.displayName;
                    newUser.google.email = profile.emails[0].value;
                    newUser.save();

                }
            })
        })
    }


    ));

    passport.use(new TwitterStrategy({
            consumerKey: configureAuth.twitterAuth.consumerKey,
            consumerSecret: configureAuth.twitterAuth.consumerSecret,
            callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
        },
        function(token, tokenSecret, profile, cb) {
            User.findOrCreate({ twitterId: profile.id },  function (accessToken, refreshToken,profile,done) {
                    process.nextTick(function () {
                        User.findOne({'twitter.id':profile.id},function (err,user) {
                            if(err) return done(err);
                            if(user) {return done(null, user)}
                            else {
                                console.log(profile);
                                newUser = new User();
                                newUser.twitter.id = profile.id;
                                newUser.twitter.token = accessToken;
                                newUser.twitter.username = profile.displayName;
                                newUser.twitter.email = profile.emails[0].value;
                                newUser.save();

                            }
                        })
                    })
                }


            )}));


};