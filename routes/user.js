const router = require('express').Router();
const User = require('../models/user');

router.post('/signup', (req, res, next) => {

    var user = new User();

    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    User.findOne({email: req.body.email}, (err, existingUser) => {
        if(existingUser) {
            console.log(req.body.email + " already exists!");
            return res.redirect('./signup');
        } else {
            user.save((err, user) => {
                if(err) {
                    return next(err);
                } else {
                    res.json(user.profile.name + ' Congratulations! user has been created!');
                }
            });
        }
    });
    
});

module.exports = router;