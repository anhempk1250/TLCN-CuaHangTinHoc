let express = require('express')
let router = express.Router();
let passport = require("passport");



router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback', passport.authenticate('google'), function (req, res) {
  let user = JSON.stringify(req.user)
    res.redirect('http://localhost:8081/mypage?user=' + user)
})




router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));


router.get('/auth/facebook/callback',
  passport.authenticate('facebook'), function (req, res) {
    let user = JSON.stringify(req.user)
    res.redirect('http://localhost:8081/mypage?user=' + user)
    //res.send({ token: req.user.token, name: req.user.name })
  });

  module.exports = router