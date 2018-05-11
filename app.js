var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
var routes = require('./routes/login');
var users = require('./routes/users');
var texiservice = require('./routes/texiservice');
var updateinfo = require('./routes/updateinfo');
var addBalance=require('./routes/addBalance');
var login_check = require('./routes/loginservice')
var signup_check = require('./routes/signupservice')
var qrcode = require('./routes/qrcode');
var clipperservices = require('./routes/clipperservices')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/texiservice', texiservice)
//app.use('/updateinfo', updateinfo);
app.use('/balance',addBalance);
app.use('/userinformation', updateinfo);
app.use('/login_check', login_check);
app.use('/signup_check', signup_check)
app.use('/qrcode', qrcode)
app.use('/clipper',clipperservices)


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
