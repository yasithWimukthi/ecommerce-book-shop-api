const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

mongoose
    .connect(
        process.env.CONNECTION_URL
    )
    .then(() => {
        app.listen(process.env.PORT || 8000);
        console.log('running on port ' + process.env.PORT)
    })
    .catch(err => {
        console.log(err);
    });