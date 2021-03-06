const express = require('express');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

//route
const users = require('./rotues/users');
const cars =require('./rotues/cars');
//connect to database
mongoose.connect('place database link here', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

//middleware
app.use(logger('dev'));
app.use(bodyparser.json());

//routes
app.use('/users', users);
app.use('/cars',cars);

//catch 404 error and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err);
});
//error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    //respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });
    //respond to terminalf
    console.log(err);
});

//start the server
app.listen(3000);
console.log('server is listening on port 3000');
