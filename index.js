const express = require('express');
require('dotenv').config();
const routes = require('./routes/routes');
require('./db_connect.js');

const app = express();

// port
const port = process.env.PORT || 5000;

// middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// route prefix
app.use(routes)

// static upload folder
app.use(express.static('public/uploads'));

// set Template engine
app.set('view engine', 'ejs');


app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
})
