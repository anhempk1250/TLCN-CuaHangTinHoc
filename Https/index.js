
var https = require('https');
let express = require('express')
let app = express()
const fs = require('fs');
let bodyParser = require('body-parser');
let passport = require("passport");
let router = require('./router')
var config = require('./config')
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');



passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: config.google_key,
  clientSecret: config.google_secret,
  callbackURL: config.google_callback_url
},
  function (accessToken, refreshToken, profile, done) {
    let newCustomer = {};
    newCustomer.id = profile._json.sub;
    newCustomer.name = profile._json.name
    newCustomer.email = profile.emails[0].value;
    return done(null, newCustomer)
  }
))


passport.use(new FacebookStrategy({
  clientID: config.facebook_key,
  clientSecret: config.facebook_secret,
  callbackURL: config.callback_url,
  profileFields: ['email', 'gender', 'displayName']
},
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      let newCustomer = {};
      newCustomer.id = profile._json.id
      newCustomer.name = profile._json.name
      newCustomer.email = profile._json.email
      return done(null, newCustomer)
    });
  }
));

app.use(cookieParser()); //Parse cookie
app.use(passport.initialize())
app.use(passport.session())
app.use(router)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

https.createServer({
  key: fs.readFileSync('./certificate/key.pem'),
  cert: fs.readFileSync('./certificate/certificate.pem')
}, app).listen(8001, function () {
  console.log('https run on 8001')
})

app.listen(8002, function () {
  console.log('server is running on 8002');
})

