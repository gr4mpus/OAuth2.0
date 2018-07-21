const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

const PORT = process.env.PORT || 3000

//view engine
app.set('view engine', 'ejs');

//cookie session
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['lallanhalwaidundundun']
}));

//passport initialized
app.use(passport.initialize());
app.use(passport.session());

//connect to mongoDB
mongoose.connect(//Create your own mongoDB database. ID and password are left intentionally
    'mongodb://authentication:auth-123@ds243441.mlab.com:43441/rahul-google-auth',
    ()=>{
        console.log('connected to mongoDB')
    }
);

//routes
app.use('/auth',authRoutes);

app.use('/profile',profileRoutes);

//home route
app.get('/', (r, s) => {
    s.render('home',{user: r.user});
});

app.listen(PORT, () => {
    console.log('http://localhost:3000');
});
