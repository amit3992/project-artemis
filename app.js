var express = require('express');
var morgan = require('morgan'); // For logging on terminal
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const mongoDBUrl = 'mongodb://root:98104@ds159235.mlab.com:59235/artemis-db';
const User = require('./models/user');
const ejs = require('ejs'); // ejs is a templating engine
const engine = require('ejs-mate');

// Connect mongoose to the DB
mongoose.connect(mongoDBUrl, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log('Connected to the DB: artemis-db');
    }
});


// Middleware for logging
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); // for x-www-form-urlencoded
app.engine('ejs', engine);
app.set('view engine', 'ejs');

/* Call routes */
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');

/* Add middleware for routes */
app.use(mainRoutes);
app.use(userRoutes);


/* Listen to port 3000 */
app.listen(3000, (err) => {
    if(err) {
        throw err;
    }
    console.log("Server is running on port 3000");
})