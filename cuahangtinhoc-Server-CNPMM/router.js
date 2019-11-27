let express = require('express')
let router = express.Router();
let passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
let middleware = require('./middleware');
let HomePageController = require('./controler/HomePageController');
let StorePageController = require('./controler/StorePageController');
let ProductDetailController = require('./controler/ProductDetailController');
let AuthenController = require('./controler/AuthenController');
router.get('/productType', HomePageController.productTypeList)
let MyPageController = require('./controler/MyPageController');


// producer
router.get('/producers', HomePageController.producerList)
// product
// product detail page
router.get('/productDetails', ProductDetailController.productDetail)
// category
router.get('/productCategory', HomePageController.productCategoryList);
// store category
router.get('/storeCategory', middleware.requireLogin, StorePageController.categoryList)
router.post('/storeCategory', middleware.requireLogin, StorePageController.insertCategory)
router.patch('/storeCategory', middleware.requireLogin, StorePageController.updateCategory)
router.delete('/storeCategory', middleware.requireLogin, StorePageController.deleteCategory)
// store authen
router.get('/storeAuthen', StorePageController.storeLogin)
router.get('/checkToken', middleware.requireLogin, AuthenController.checkLoginEmployee)
module.exports = router;

// store order
router.post('/storeOrder',middleware.requireLogin, StorePageController.insertOrder)
router.get('/storeOrder',middleware.requireLogin, StorePageController.getOrder)
// store product
router.get('/storeProduct',middleware.requireLogin, StorePageController.productList)
//router.post('/storeProduct', StorePageController.insertProduct)
router.patch('/storeProduct', StorePageController.updateProduct)
router.delete('/storeProduct', StorePageController.deleteProduct)

//router.post('/storeProduct', upload.array('images',4), StorePageController.insertProduct)
// store type product
router.get('/storeProductType',middleware.requireLogin, StorePageController.productTypeList)











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
  passport.authenticate('facebook'), function(req,res){
    res.send({token: req.user.token, name: req.user.name})
  });  
// mypage 
//router.get('/customerInfo',middleware.requireLoginCustomer, MyPageController.getCustomerInfo)
router.get('/orderList', MyPageController.getListOders)
router.get('/orderDetail', MyPageController.detailOrder)
router.get('/listBoughtProduct', MyPageController.getListBoughtProduct)
router.post('/changePassword', MyPageController.changePassword)
router.get('/checkLoginCustomer' , middleware.requireLoginCustomer, MyPageController.checkLoginCustomer)
router.get('/customerLogin', AuthenController.customerLogin)

