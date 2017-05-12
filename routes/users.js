var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser');
var validator = require('express-validator');
/* GET register page */
router.get('/register', function (req, res, next) {
    res.render('register');
});
router.get('/login', function (req, res, next) {
    res.render('login');
});

console.log(User);

router.post('/register', function (req, res, next) {
    var login = req.body.login;
    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    var teacher = req.body.teacher;
    var role = req.body.role;
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


    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {errors: errors});
        console.log(errors);
    }
    else {
        var newUser =User(
            {
                login: login,
                name: toString(name + " " + surname),
                email: toString(email),
                password: toString(password),
                teacher: toString(teacher),
                role: toString(role)
            });
        console.log(newUser);
        var User = User.createUser(newUser, function (err, user) {
            console.log(user);
            res.redirect('/')
        });

    }


});
module.exports = router;