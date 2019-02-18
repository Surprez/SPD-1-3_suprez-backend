// import modules
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

    app.post("/signup", (req, res) => {
        // this route will handle signing up users

        const newBody = req.body;
        console.log("This is password before", req.body.password);
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            console.log("This is password after", req.body.password);

            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                const user = new User({
                    Account_id: new mongoose.Types.ObjectId(),
                    userName: newBody.userName,
                    password: hash



                });
                user.save().then(result => {
                    const JWTToken = jwt.sign({
                        _id: result.Account_id

                    }, process.env.SECRET, {
                        expiresIn: '2h'
                    });
                    console.log("user account created", result);
                    return res.json(JWTToken).status(200);
                }).catch(error => {
                    console.log("User signup error:", error)
                    res.status(500).json({
                        error: err
                    });
                });
            }

        })

    })
}