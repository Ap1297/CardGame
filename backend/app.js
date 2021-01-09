require('./config/config');
require('./models/db');
require('./config/passportConfig'); 

const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const passport = require('passport');

const rtsIndex = require('./routes/index.router');

var flash        = require("connect-flash");

var cookieParser = require("cookie-parser"),
    session = require("express-session"),
     methodOverride = require("method-override"),
     session = require("express-session");

const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080; // Step 1

var app = express();
app.use(flash());
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api',rtsIndex);
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

//Step 1 Cluster atlas url
MONGODB_URI='mongodb+srv://dbUser:dbUser@cluster0.3flln.mongodb.net/CardName?retryWrites=true&w=majority';
// Step 2
mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/OTTWebsite', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));