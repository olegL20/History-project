var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET register page */
router.get('/register', function(req, res, next) {
    res.render('register');
});
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/register', function(req, res, next) {
    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    var pass1 = req.body.password;
    var pass2 = req.body.password2;
    var teacher = req.body.teacher;
//validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('surname', 'Surname is required').notEmpty();
    req.checkBody('teacher', 'Teacher is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);


    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {errors: errors});
        console.log(errors)
    }
    else {
        console.log(name,surname,email, pass1,teacher);

        var newUser = new User(
            {
                name: name,
                surname: surname,
                email: email,
                password: pass1,
                teacher: teacher
            });

        User.createUser(newUser, function (err, user) {

            console.log(user);
        });

    }


});
module.exports = router;