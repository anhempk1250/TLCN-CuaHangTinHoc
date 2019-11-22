let express = require('express')
let router = express.Router();
let passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
let middleware = require('./middleware');
let HomePageController = require('./controler/HomePageController');
let StorePageController = require('./controler/StorePageController');
<<<<<<< HEAD
let ProductDetailController = require('./controler/ProductDetailController');

router.get('/productType', HomePageController.productTypeList)
=======
let MyPageController = require('./controler/MyPageController');

>>>>>>> 7bfac1a22b6957f9d8813e4a7cd0569aef1848bf
// product
// product detail page
router.get('/productDetails', ProductDetailController.productDetail)
// category
router.get('/productCategory', HomePageController.productCategoryList);
// store category
router.get('/storeCategory', middleware.requireLogin, StorePageController.categoryList)
router.post('/storeCategory', middleware.requireLogin, StorePageController.insertCategory)
router.put('/storeCategory', middleware.requireLogin, StorePageController.updateCategory)
router.delete('/storeCategory', middleware.requireLogin, StorePageController.deleteCategory)
// store authen
router.get('/storeAuthen', StorePageController.storeLogin)
module.exports = router;

// store order
router.post('/storeOrder',middleware.requireLogin, StorePageController.insertOrder)

// store product
router.get('/storeProduct',middleware.requireLogin, StorePageController.productList)

// store type product
router.get('/storeProductType',middleware.requireLogin, StorePageController.productTypeList)

<<<<<<< HEAD










function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

/// facebook
router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect : 'http://localhost:8081/mypage', failureRedirect: 'http://localhost:8081' }));
=======
// mypage
router.get('/customerInfo', MyPageController.getCustomerInfo)
router.get('/listOrders', MyPageController.getListOders)
router.get('/orderDetail', MyPageController.detailOrder)
router.get('/listBoughtProduct', MyPageController.getListBoughtProduct)
>>>>>>> 7bfac1a22b6957f9d8813e4a7cd0569aef1848bf
