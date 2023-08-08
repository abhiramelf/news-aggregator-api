const express = require('express');
const routes = require('express').Router();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(routes);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = 3000;

routes.get('/', (req, res) => {
    res.status(200).send("Welcome to the news aggregator api app!");
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});