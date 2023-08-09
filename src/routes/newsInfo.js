const express = require('express');
const newsRoutes = require('express').Router();
const mongoose = require('mongoose');
const User = require("../models/user");
const validation = require('../helpers/validations');
const getNews = require('../controller/newsController');
const verifyToken = require('../middleware/verifyJWT');

newsRoutes.use(express.urlencoded({ extended: false }));
newsRoutes.use(express.json());

newsRoutes.put('/preference', verifyToken, (req, res) => {
    if (!req.user && req.message == null) {
        res.status(403).send({
            message: "Invalid JWT token"
        });
    }
    else if (!req.user && req.message) {
        res.status(403).send({
            message: req.message
        });
    }

    if(validation.validatePreferenceInfo(req.body).status) {
        User.findOneAndUpdate({
            email: req.user.email
        }, {
            q: req.body.q,
            domains: req.body.domains
        }, { new: true }).then((user) => {
            res.status(200).json(validation.validatePreferenceInfo(req.body));
        }).catch((err) => {
            res.status(500).send(err);
        });
    }
    else {
        res.status(400).json(validation.validatePreferenceInfo(req.body));
    }
});

newsRoutes.get('/preference', verifyToken, (req, res) => {
    if (!req.user && req.message == null) {
        res.status(403).send({
            message: "Invalid JWT token"
        });
    }
    else if (!req.user && req.message) {
        res.status(403).send({
            message: req.message
        });
    }

    User.findOne({
        email: req.user.email
    }).then((user) => {
        res.status(200).json({
            message: "Success",
            preferences: {
                q: user.q,
                domains: user.domains
            }
        });
    }).catch((err) => {
        res.status(400).send(`Can't find user - ERROR - ${err}`);
    });
});

newsRoutes.get('/news', verifyToken, async (req, res) => {
    if (!req.user && req.message == null) {
        res.status(403).send({
            message: "Invalid JWT token"
        });
    }
    else if (!req.user && req.message) {
        res.status(403).send({
            message: req.message
        });
    }

    try {
        let resp = await getNews(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEWSAPI_KEY}`);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(resp);
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: err });
    }
});

module.exports = newsRoutes;