var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var stylus = require('stylus');
var nib = require('nib');
var bodyParser = require('body-parser');
var settings = require('./settings.js');

settings.virtualDirPath = process.env.virtualDirPath !== undefined ? process.env.virtualDirPath : '/';

var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();


function compile(str, path) {
    return stylus(str)
    .set('filename', path)
    .use(nib());
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(
    {
        src: path.join(__dirname, 'public'),
        compile: compile
    }
));
app.use(express.static(path.join(__dirname, 'public')));

app.use(settings.virtualDirPath, routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//app.listen(process.env.PORT);

module.exports = app;
