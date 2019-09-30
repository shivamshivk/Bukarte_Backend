const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const d_route = require('./api/routes/default_route');
const userRoute = require('./api/routes/users');
const productRoute = require('./api/routes/product');
const categoryRoute = require('./api/routes/category');
const bannerRoute = require('./api/routes/banner');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://shivamshivl:'+ 
 process.env.MONGO_ATLAS_PAS +
 '@shivcluster-izobp.mongodb.net/bukarte?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);

app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded( {extended : false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/',d_route);
app.use('/users',userRoute);
app.use('/products',productRoute);
app.use('/category',categoryRoute);
app.use('/banner',bannerRoute);

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