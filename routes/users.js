let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let validator = require('express-validator');
/* GET register page */
router.get('/register', function (req, res, next) {
    res.render('register');
});
router.get('/login', function (req, res, next) {
    res.render('login');
});

console.log(User);

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
        let newUser =User(
            {
                login: login,
                name: toString(name + " " + surname),
                email: toString(email),
                password: toString(password),
                teacher: toString(teacher),
                role: toString(role)
            });
        console.log(newUser);
        let User = User.createUser(newUser, function (err, user) {
            console.log(user);
            res.redirect('/')
        });

    }


});
module.exports = router;