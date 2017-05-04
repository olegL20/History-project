var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var session = require('express-session');
var validator = require('express-validator');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var http = require('http');

var mysql = require('mysql');
var connection = mysql.createConnection
(
    {
        host: 'localhost',
        user: 'root',
        password:'',
        database: 'mydb',


    }
)
connection.connect();

function keepalive() {
    connection.query('select 1', [], function(err, result) {
        if(err) return console.log(err);
        // Successul keepalive
    });
}
setInterval(keepalive, 6*5);

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();

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
                var namespace = param.split('.'),
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
app.use('/users', users);
app.use('/auth', auth);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
