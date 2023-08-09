const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Business logic for user registration and saving to DB
let signup = (req, res) => {
    let fullName = req.body.fullName;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 8);

    const user = new User({
        fullName: fullName,
        email: email,
        password: password
    });

    user.save().then((data) => {
        res.status(200).send("User registered successfully!");
    }).catch((err) => {
        res.status(500).send("Error occured, couldn't register user!");
    });
};

// Business logic for user login and password comparison
let signin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        email: email
    }).then((user) => {
        let passwordIsValid = bcrypt.compareSync(password, user.password);
        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password!"
            });
        }
        let token = jwt.sign({
            id: user.id
        }, process.env.API_SECRET, {
            expiresIn: 86400
        });

        return res.status(200).send({
            user: {
                user: user._id,
                email: user.email,
                fullName: user.fullName
            },
            message: "Login successful",
            accessToken: token
        });
    }).catch((err) => {
        return res.status(500).send({
            message: err
        });
    });
};

module.exports = {signup, signin};