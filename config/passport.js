const passport = require('passport'); // For authentication
const localStrategy = require('passport-local').Strategy; // For local logins
const User = require('../models/user');


/* Serialize and deserialize user objects */

// Serialize translates objects(User object) into a format which can be stored (Mongo)
passport.serializeUser((user, done) => {
	done(null, user._id);
});

// 1dt argument is a user._id
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

/* Middleware to process login information */
passport.use('local-login', new localStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {

	User.findOne({
		email: email
	}, function(err, user) {
		if(err) {
			done(err);
		}
		if(!user) {
			done(null, false, req.flash('loginMessage', 'This user does not exist!'));
		}

		if(!user.comparePassword(password)) {
			return done(null, false, req.flash('loginMessage', 'Wrong password, pal'));
		}

		return done(null, user);
	})
}));

/* Custom functions to validate if user has logged in or not */
exports.isAuthenticated = (req, response, next) => {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}