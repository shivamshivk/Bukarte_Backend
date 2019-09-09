const express = require('express')
const app = express();
const bodyParser = require('body-parser');

const d_route = require('./api/routes/default_route');
const userRoute = require('./api/routes/users');

const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://shivamshivl:'+ 
 process.env.MONGO_ATLAS_PAS +
 '@shivcluster-izobp.mongodb.net/bukarte?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);

app.use(bodyParser.urlencoded( {extended : false}));
app.use(bodyParser.json());

app.use('/',d_route);
app.user('/users',userRoute);

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500 ).json({
        error:{
            message : error.message
        }
    });
});


module.exports = app;