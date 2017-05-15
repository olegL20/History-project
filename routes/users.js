const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const validator = require('express-validator');
const flash= require('connect-flash');
const passport = require('passport');

const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
let LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');



/* GET register page */

router.get('/register',function (req, res, next) {
    res.render('register');
});
router.get('/login', function (req, res, next) {
    res.render('login');
});

router.post('/register', passport.authenticate('local-signup',
    {
        successRedirect:'/users/login' ,
        failureRedirect: '/users/register',
        failureFlash: true
    }
));


router.post('/login',
function(req,res){
   let email_log = req.body.email;
   let password_log = req.body.password;

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();


    User.findOne({email:email_log,password:md5(password_log)},function (err,user) {
       if(err) { console.log(err); return res.status(500).send(); }
       if(!user) {  return res.status(404).send(); }
        return res.redirect('/');
    });

});


const GooglePlusStrategy = require('passport-google-plus');




module.exports = router;