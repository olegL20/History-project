let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let exphbs = require('express-handlebars');
let session = require('express-session');
let validator = require('express-validator');
let flash = require('connect-flash');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let mongo = require('mongodb');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/history-project');
let db= mongoose.connection;
let mongorito = require('mongorito');
let model = mongorito.Model;
mongorito.connect('localhost/history-project');


let index = require('./routes/index');
let users = require('./routes/users');
let auth = require('./routes/auth');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session
    ({
        secret: 'secret',
        saveUninitialized:true,
        resave: true
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use
(
    validator(
        {
            errorFormatter: function(param,msg,value)
            {
                let namespace = param.split('.'),
                    root = namespace.shift(),
                    formParam = root;
                while (namespace.length)
                {
                    formParam+='['+namespace.shift()+']';
                }

            return { param:formParam, msg: msg, value: value}
            }
        }
    )
);

app.use(flash());

app.use('/', index);
/*app.use('/users', users);*/
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.success_msg= req.flash('success_msg');
  res.locals.error_msg= req.flash('error_msg');
  res.locals.error= req.flash('error');
  next();
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000,function () {});

module.exports = app;
