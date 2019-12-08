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
let Image = require('./model/Image')
var multer = require('multer')
let fs = require('fs-extra')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

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
router.post('/storeOrder', middleware.requireLogin, StorePageController.insertOrder)
router.patch('/storeOrder', middleware.requireLogin, StorePageController.confirmOrder)
router.patch('/storeCancelOrder', middleware.requireLogin, StorePageController.cancelOrder)
router.get('/storeOrder', middleware.requireLogin, StorePageController.getOrder)
router.get('/storeCustomer', middleware.requireLogin, StorePageController.getCustomerList)
router.get('/storeOrderStatus', middleware.requireLogin, StorePageController.getOrderStatusList)
// store product
router.get('/storeProduct', middleware.requireLogin, StorePageController.productList)
router.post('/storeProduct', middleware.requireLogin, upload.array('images'), StorePageController.insertProduct)
router.patch('/storeProduct', middleware.requireLogin, upload.array('images'), StorePageController.updateProduct)
router.patch('/storeUpdateProductWithoutImage',  middleware.requireLogin, StorePageController.updateProduct)
router.delete('/storeProduct', middleware.requireLogin, StorePageController.deleteProduct)
router.get('/storeProducerFromProductPage', middleware.requireLogin, StorePageController.loadProducer)
router.get('/storeCategoryFromProductPage', middleware.requireLogin, StorePageController.loadCategory)


router.get('/storeProductType', middleware.requireLogin, StorePageController.productTypeList)
router.post('/storeProductType', middleware.requireLogin, StorePageController.insertProductType)
router.patch('/storeProductType', middleware.requireLogin, StorePageController.updateProductType)
router.delete('/storeProductType', middleware.requireLogin, StorePageController.deleteProductType)
router.get('/storeProductListFromProductTypePage', middleware.requireLogin, 
StorePageController.getStoreProductListFromProductTypePage)
router.post('/storeProductWithType', middleware.requireLogin, StorePageController.addProductToType)
router.delete('/storeProductWithType', middleware.requireLogin, StorePageController.deleteProductType)




function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback', passport.authenticate('google'), function (req, res) {
  res.redirect('http://localhost:8081/mypage?token=' + req.user.token)
  //res.send({ token: req.user.token, name: req.user.name })
})




router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));


router.get('/auth/facebook/callback',
  passport.authenticate('facebook'), function (req, res) {
    res.redirect('http://localhost:8081/mypage?token=' + req.user.token)
    //res.send({ token: req.user.token, name: req.user.name })
  });
// mypage 
//router.get('/customerInfo',middleware.requireLoginCustomer, MyPageController.getCustomerInfo)
router.get('/orderList', MyPageController.getListOders)
router.get('/orderDetail', MyPageController.detailOrder)
router.get('/listBoughtProduct', MyPageController.getListBoughtProduct)
router.post('/changePassword', MyPageController.changePassword)
router.get('/checkLoginCustomer', middleware.requireLoginCustomer, MyPageController.checkLoginCustomer)
router.get('/customerLogin', AuthenController.customerLogin)

