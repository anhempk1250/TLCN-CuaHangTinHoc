let express = require('express')
let bodyParser = require('body-parser');
let mongodb = require('mongodb');
let mongoose = require('mongoose')
let app = express()

let passport = require("passport");
let passportFB = require("passport-facebook").Strategy;

mongoose.connect('mongodb://localhost:27017/cuahangtinhoc', { useNewUrlParser: true })
  .then(() => console.log('connected'))

let router = require('./router')

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next();
});

app.use(express.static(__dirname + '/public'))

app.use(router)


app.get('/auth/fb', passport.authenticate('facebook', {scope: ['email']}))
app.get('/authen/fb/cb', passport.authenticate('facebook', {
  failureRedirect: '/', successRedirect: '/mypage'
}))


app.listen(8000, function () {
  console.log('server is running on 8000');
})



let Customer = require('./model/CustomerAccount')
passport.use(new passportFB(
  {
    clientID: "554165448705630",
    clientSecret: "9e4936e38b05d3873259237eec1ab3fc",
    callbackURL: "https://localhost:8000/auth/fb/cb"
  },
  (
    accessToken,
    refreshToken,
    profile,
    done
  ) => { 
      console.log(profile)
   }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  done()
})