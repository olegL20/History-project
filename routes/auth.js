var express = require('express');
var router = express.Router();

/* GET register page */
router.get('/register', function(req, res, next) {
    res.render('register');
});
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/register', function(req, res, next) {
var name= req.body.name;
var surname= req.body.surname;
var email= req.body.email;
var pass1= req.body.password;
var pass2= req.body.password2;
var teacher= req.body.teacher;
var birthday= req.body.birth;



//validation

req.checkBody('name','Name is required').notEmpty();
req.checkBody('email','Email is required').notEmpty();
req.checkBody('email','Email is not valid').isEmail();
req.checkBody('surname','Surname is required').notEmpty();
req.checkBody('teacher','Teacher is required').notEmpty();
req.checkBody('password','Password is required').notEmpty();
req.checkBody('password2','Passwords do not match').equals(req.body.password);
req.checkBody('birth','Birthday is required').notEmpty();

var errors = req.validationErrors();

if(errors){res.render('register',{errors:errors});console.log(errors)}
else
{

}

});
module.exports = router;
