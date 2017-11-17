const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const passportConf = require('../config/passport');

/* Log in - get */
router.get('/login', (req, res) => {
    if(req.user) {
        return res.redirect('/');
    }

    res.render('accounts/login', { message: req.flash('loginMessage')});
});

/* Log in - post. Use the local-login method written in passport.js */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: './login',
    failureFlash: true
}));

/* Sign up - get */
router.get('/signup', (req, res, next) => {
    res.render('accounts/signup', {
        errors: req.flash('errors')
    });
});

/* Sign up - post */
router.post('/signup', (req, res, next) => {

    var user = new User();

    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    User.findOne({email: req.body.email}, (err, existingUser) => {
        if(existingUser) {
            req.flash('errors', 'Account with that email address already exists');
            return res.redirect('./signup');
        } else {
            user.save((err, user) => {
                if(err) {
                    return next(err);
                } else {
                    // return res.direct('/profile'');
                    console.log(user.profile.name + ' created!');
                    return res.redirect('/');
                }
            });
        }
    });
    
});

module.exports = router;