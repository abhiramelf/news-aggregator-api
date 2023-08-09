// All imports
const express = require('express');
const routes = require('express').Router();
const cors = require('cors');
const newsInfo = require('./routes/newsInfo');
const mongoose = require('mongoose');
const { signup, signin } = require('./controller/authController');
require('dotenv').config();

// All initializations
const app = express();
app.use(cors());
app.use(routes);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

routes.use(express.json());

const PORT = 3000;

// Initialize and connect to DB
try {
    mongoose.connect(process.env.DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("Connection to db established!");
}
catch (error) {
    console.log(error);
}

// Initialize routes
routes.use('/', newsInfo);

routes.get('/', (req, res) => {
    res.status(200).send("Welcome to the news aggregator api app!");
});

routes.post('/register', signup);
routes.post('/login', signin);

// Start server
app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});