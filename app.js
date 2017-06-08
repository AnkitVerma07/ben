'use strict';
var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const jayson = require('jayson/promise');
const cors = require('cors');
const Promise = require('bluebird');
const hbs = require('hbs');

const thinky = require('./util/thinky.js');
// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();
const IoC = require('./IoC');
const ioc = new IoC(app);
ioc.configure();

// view engine setup
hbs.registerPartials('./views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



// const methods = {
//     math: {
//         add: function(args) {
//             return Promise.resolve({ sum: args.x + args.y });
//         }
//     },
//     users: ioc.get('rpcUserRouter')
// };

// function flattenObject(ob) {
//     let toReturn = {};
//     Object.keys(ob).forEach(function(key) {
//         if ((typeof ob[key]) === 'object') {
//             let flatObject = flattenObject(ob[key]);
//             Object.keys(flatObject).forEach(function(x) {
//                 toReturn[key + '.' + x] = flatObject[x];
//             });
//         } else if ((typeof ob[key]) === 'function') {
//             toReturn[key] = ob[key];
//         }
//     });
//     return toReturn;
// }

//const flatten = flattenObject(methods);
//const server = jayson.server(flatten, { collect: true, params: Object });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const consistentResponseMiddleware = ioc.get('consistentResponseMiddleware').middleware;
app.use('/benapi/*', bodyParser.urlencoded({extended: true}), bodyParser.json({
    verify: function(req, res, buf) {
        req.rawBody = buf
    }
}), consistentResponseMiddleware);


app.use(function(req, res, next) {
    console.log('\x1b[33m%s\x1b[0m', req.body.method);
    //console.log(req.body);
    next();
});


app.use(cors());

app.use('/benapi/users', ioc.get('userRouter').router);
app.use('/benapi/surveys', ioc.get('surveyRouter').router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
    console.log(err.message);
    res.status(err.status || 500)
        .json({
            message: err.message,
            error: err
        });
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
        .json({
            message: err.message,
            error: {}
        });
});

module.exports = app;
