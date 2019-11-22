let express = require('express')
let router = express.Router();
let middleware = require('./middleware');
let HomePageController = require('./controler/HomePageController');
let StorePageController = require('./controler/StorePageController');
// product
router.get('/products', HomePageController.productList);
router.get('/productDetails', HomePageController.product)
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