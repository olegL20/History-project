let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let validator = require('express-validator');
let mongorito = require('mongorito');
const flash= require('connect-flash');
let Model = mongorito.Model;
const User = module.exports = Model.extend({collection:'users'});
const passport = require('passport')
const passport_local = require('passport-local')
    , LocalStrategy = require('passport-local').Strategy;

const crypto = require('crypto');


/* GET register page */

router.get('/register', function (req, res, next) {
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
        let user = new User({
                login: login,
                name: name + " " + surname,
                email: email,
                password: pass,
                teacher: teacher,
                role: role
            });
     console.log(user);



       // req.flash('success_msg','Вы успішно зареєструвались!! Введіть логін аба email та пароль')
        res.redirect('/users/login');
    }


});

passport.use(new LocalStrategy(
    function(email, password, done) {
        User.get({email: req.body.email},function (err,user) {
            if(err) throw err;
            if(!user) return done( null , false, {message: "unknown user"});
        });
        User.get({password:md5(user.password),function (err, isMatch) {
            if (err) throw err;
            if (isMatch) return done(null, user);
            else return done(null, false, {message: "do not match"})
        }})

        }));
passport.serializeUser(function (user,done) {
    done(null,user.get('_id'));
    
});
passport.deserializeUser(function (id,done) {
    User.get({_id: id,function (err,user) {
        done(err, user);
    }})});
router.post('/login',passport.authenticate('local',{successRedirect:'/',failureRedirect:'users/login',
function(req,res){
    res.redirect('/')
}}));
module.exports = router;