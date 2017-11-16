const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

/* User schema attributes/characteristics */
var userSchema = new Schema({
    
    email: {type: String, unique: true, lowercase: true},
    password: {type: String},

    profile: {
        name: {type: String, default:'Jane'},
        picture: {type: String, default:'image'}
    },

    address: {type: String},
    history: [{
        date: Date,
        paid: {type: Number, default: 0}
    }]
});

/* Hash password before saving to DB */
/* if i use an arrow function, it changes the scope of 'this' hence the error with isModified method */
userSchema.pre('save', function (next){
    var user = this;

    if(!user.isModified('password')) {
        return next();
    }
    
    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            next(err);
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) {
                next(err);
            }
            user.password = hash;
            next();
        });
    });
});


/* Compare password in DB and the one that users type in */
// For Custom methods use => "methods."
userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

// Export the schema
module.exports = mongoose.model('User', userSchema);