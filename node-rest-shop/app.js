const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/product')

const orderRoutes = require("./api/routes/order");

const userRoutes = require('./api/routes/user');

const mongodb = require('mongoose');
mongodb.connect(
  "mongodb+srv://umeesfd96:" +
    process.env.MONGO_ATLAS_PW +
    "@node-shop.vh60m.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/product' , productRoutes);

app.use("/order", orderRoutes);

app.use("/user", userRoutes);


app.use((req ,res ,next) => {
    res.header("Access-Control-Origin-Allow" , "*");
    res.header("Access-Control-Allow-Headers" ,
    "Origin , X-Requested-with , Content-Type , Accept , Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT , POST , PATCH , DELETE');
        return res.status(200).json({});
    }
})

app.use((req , res , next) => {
    const error = new Error('Not Found');
    error.status=404;
    next(error)
})
app.use((error , req , res ,next ) => {
        res.status(error.status || 500);
        res.json({
            message : error.message
        })
})
module.exports = app;