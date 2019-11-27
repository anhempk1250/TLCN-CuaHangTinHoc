let express = require('express')
let bodyParser = require('body-parser');
let mongodb = require('mongodb');
let mongoose = require('mongoose')
let Customer = require('./model/CustomerAccount')
let app = express()
var configx = require('./config/config.json');
var config = require('./config')
let passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser');
var https = require('https');
const fs = require('fs');
var jwt = require('jsonwebtoken')
var secretKey = configx.secretKey
/**
 * 
https.createServer({
  key: fs.readFileSync('./certificate/key.pem'),
  cert: fs.readFileSync('./certificate/certificate.pem')
}, app).listen(8001, function () {
  console.log('https run on 8001')
}) 
 * 
 */
// Passport session setup. 
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
passport.use(new FacebookStrategy({
  clientID: config.facebook_key,
  clientSecret: config.facebook_secret,
  callbackURL: config.callback_url,
  profileFields: ['email', 'gender', 'displayName']
},
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      Customer.findOne({ id: profile._json.id }, (err, cus) => {
        if (err) return done(err)

        if (cus && cus != {}) {
          console.log('here', cus);

          let token = jwt.sign({ id: cus.id, name: cus.name, _id: cus._id }, secretKey)

          return done(null, token);
        }
        else {
          const newCustomer = new Customer();
          newCustomer.id = profile._json.id
          newCustomer.name = profile._json.name
          newCustomer.email = profile._json.email
          newCustomer.save((err, customer) => {
            console.log(profile)
            let token = jwt.sign({ id: cus.id, name: cus.name, _id: cus._id }, secretKey)
            return done(null, { token: token, name: customer.name })
          });
        }

      })
    });
  }
));




mongoose.connect('mongodb://localhost:27017/cuahangtinhoc', { useNewUrlParser: true })
  .then(() => console.log('connected'))

let router = require('./router')

app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser()); //Parse cookie

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  next();
});

app.use(express.static(__dirname + '/public'))

app.use(router)

var multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({storage: storage})
app.post('/storeProduct', upload.array('images'), function (req, res) {
  console.log(req);
  res.send(req.files)
})


app.listen(8000, function () {
  console.log('server is running on 8000');
})

