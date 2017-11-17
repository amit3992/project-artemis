var express = require('express');
var morgan = require('morgan'); // For logging on terminal
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const secret = require('./config/secret');
const User = require('./models/user');
const ejs = require('ejs'); // ejs is a templating engine
const engine = require('ejs-mate');
const session = require('express-session');
const cookieParser = require('cookie-parser'); // Express uses cookie to store sessionID
const flash = require('express-flash');
const mongoStore = require('connect-mongo')(session); // Stores sessions on server side
const passport = require('passport');



// Connect mongoose to the DB
mongoose.connect(secret.database, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log('Connected to the DB: artemis-db');
    }
});


/* Middleware connects */
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); // Middleware for logging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); // for x-www-form-urlencoded
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(cookieParser());

// Forces the session to save the session store
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey,
    store: new mongoStore({
        url: secret.database,
        autoReconnect: true
    })
}));

// Flash depends on session and cookie
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


/* Call routes */
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');

/* Add middleware for routes */
app.use(mainRoutes);
app.use(userRoutes);


/* Listen to port 3000 */
app.listen(secret.port, (err) => {
    if(err) {
        throw err;
    }
    console.log("Server is running on port: " + secret.port);
})