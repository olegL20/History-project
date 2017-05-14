const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const validator = require('express-validator');
const flash= require('connect-flash');
const passport = require('passport');
const passport_local = require('passport-local');
const mongoose = require('mongoose');
const crypto = require('crypto');

mongoose.Promise = global.Promise;
let LocalStrategy = require('passport-local').Strategy;


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
        let pass;
        pass = md5(password);
        let user = new users({
            login: login,
            name: name + " " + surname,
            email: email,
            password: pass,
            teacher: teacher,
            role: role
        });
        user.save();


        passport.serializeUser(function (user, done) {
            done(null, user._id);

        });
        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                done(err, user._id);
            })
        });
    }});

router.post('/login',passport.authenticate('local',{successRedirect:'/',failureRedirect:'users/login',
function(req,res){
    email = req.body.email;
    password = req.body.password;

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password is required').equals(users.find({password: password}));
    res.redirect('/')
}}));
module.exports = router;