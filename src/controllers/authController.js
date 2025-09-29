const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
    signup: (req, res) => {
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.role
        });
        user.save().then((data) => {
            return res.status(200).json({ "message": "User registered successfully" });
        }).catch((err) => {
            return res.status(500).json({ "message": "Some error occured while registering user", "error": err });
        })
    },

    login: (req, res) => {
        var emailPassed = req.body.email;
        let passwordPassed = req.body.password;

        User.findOne({ email: emailPassed }).then((user) => {
            console.log(user);
            if (!user) {
                return res.status(404).json({ "message": "User not found" });
            }   
            let passwordIsValid = bcrypt.compareSync(passwordPassed, user.password);
            if (!passwordIsValid) {
                return res.status(401).json({ "message": "Invalid Password" });
            } else {
                var token = jwt.sign({ id: user._id },
                    process.env.SECRET_KEY, {
                    expiresIn: 86400 // 24 hours
                });
                return res.status(200).json({ "message": "Login successful", "token": token });
            }
        }).catch((err) => {
            return res.status(500).json({ "message": "Some error occured while logging in", "error": err });
        });
    }
}


