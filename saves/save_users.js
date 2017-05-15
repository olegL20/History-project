const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const validator = require('express-validator');
const flash= require('connect-flash');
const passport = require('passport');
const passport_local = require('passport-local');

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
function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}
router.post('/register', function (req, res, next) {
    let login = req.body.login;
    let name = req.body.name;
    let surname = req.body.surname;
    let email = req.body.email;
    let password = req.body.password;
    let password2 = req.body.password2;
    let teacher = req.body.teacher;
    let role = req.body.role;
//validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('login', 'Login is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('surname', 'Surname is required').notEmpty();
    req.checkBody('teacher', 'Teacher is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    req.checkBody('role', 'Choose your role').notEmpty(req.body.role);


    let errors = req.validationErrors();
    if (errors) {
        res.render('register', {errors: errors});
        console.log(errors);
    }
    else {
        let newUser = new User();
        newUser.local.email = email;
        newUser.local.name = name+" "+surname;
        newUser.local.password = password;
        newUser.local.teacher = teacher;
        newUser.local.role = role;
        newUser.save();
        res.redirect('/users/login');
        console.log(User);
    }});


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

app.get('/users/google',passport.authenticate('google',{scrope: ['profile','email']}));
app.get('/users/google/callback',
    passport.authenticate('google',
        {successRedirect: '/',
            failureRedirect: '/users/login'
        }));
module.exports = router;/**
 * Created by olegl on 15.05.2017.
 */
