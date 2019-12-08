var ProductType = require('../model/Product_Type');
var Category = require('../model/Product_Category');
var Product = require('../model/Product');

exports.productTypeList = function (req, res) {
  ProductType.find().populate('product_list_with_type', null, { status: 1 }).populate('category').exec(function (err, list) {
    if (err) res.send({ msg: { msg: err } })
    else {
      res.send({ list: list })
    }
  })
}

exports.getStoreCategoryFromProductPage = function (req, res) {
  Category.find({ status: 1 }).exec(function (err, list) {
    if (err) res.send(err)
    else res.send({ list: list })
  })
}

exports.getStoreProductListFromProductTypePage = function (req, res) {
  Product.find({ status: 1 }).exec(function (err, list) {
    if (err) res.send(err)
    else res.send({ list: list })
  })
}

exports.insertProductType = function (req, res) {
  productType = new ProductType();
  productType.id = productType._id;
  productType.HomePage = false;
  if (req.query.HomePage) {
    productType.HomePage = true;
  }
  productType.name = req.query.name
  productType.category = req.query.product_category_id
  productType.save(function (err, type) {
    if (err) res.send({ 'msg': err, 'RequestSuccess': false })
    else {
      Category.findOne({ id: type.category }, function (err, category) {
        category.product_types.push(type.id);
        category.save();
        res.json({ 'msg': 'Thêm thành công', 'RequestSuccess': true })
      })
    }
  })
}

exports.updateProductType = function (req, res) {
  ProductType.findOne({ id: req.query.id }, function (err, productType) {
    if (err) res.send({ 'msg': err, RequestSuccess: false })
    else {
      productType.HomePage = false;
      if (req.query.HomePage == 1) {
        productType.HomePage = true;
      }
      productType.name = req.query.name
      let categoryID = productType.category;
      Category.findById(categoryID, function (err, category) {
        if (!err && category) {
          for (let i = 0; i < category.product_types.length; i++) {
            if (category.product_types[i].id == productType.id) {
              category.product_types.splice(i, 1);
              category.save();
              break;
            }
          }
          productType.category = req.query.product_category_id
          productType.save(function (err, type) {
            if (err || !type) res.send({ 'msg': type, 'RequestSuccess': false })
            else {
              if (type) {
                Category.findOne({ id: type.category }, function (err, category) {
                  if (err) res.json({ 'msg': err, 'RequestSuccess': false })
                  else {
                    if (category) {

                      category.product_types.push(type.id);
                      category.save();
                      res.json({ 'msg': 'Thêm thành công', 'RequestSuccess': true })
                    } else res.json(type.category)
                  }
                })
              } else res.send('2');
            }
          })
        } else res.send(category);
      })
    }
  })
}

exports.deleteProductType = function (req, res) {
  ProductType.findOne({ id: req.query.id }, function (err, type) {
    if (!err && type) {
      let categoryID = type.product_category_id;
      Category.findById(categoryID, function (err, category) {
        if (!err && category) {
          for (let i = 0; i < category.product_types.length; i++) {
            if (category.product_types[i].id == productType.id) {
              category.product_types.splice(i, 1);
              category.save();
              break;
            }
          }
        }
      })
      type.remove();
      res.json({ 'msg': 'Xóa thành công', 'RequestSuccess': true })
    } else {
      res.json({ 'msg': 'Không tìm thấy loại', 'RequestSuccess': false })
    }
  })
}

exports.addProductToType = function (req, res) {
  ProductType.findOne({ id: req.query.product_type_id }).populate('product_list_with_type').exec(function (err, type) {
    if (!err && type) {
      exist = false;
      for (let i = 0; i < type.product_list_with_type.length; i++) {
        if (type.product_list_with_type[i]._id == req.query.product_Object_id) {
          exist = true;
          break;
        }
      }
      if (exist == true) {
        res.send({
          'msg': 'Sản phẩm ' + req.query.product_id + ' đã thuộc loại '
            + req.query.product_type_name, RequestSuccess: true
        });
      } else {
        type.product_list_with_type.push(req.query.product_Object_id);
        type.save(function (err, uType) {
          if (err || !uType) res.send({ 'msg': err, RequestSuccess: false })
          else {
            res.send({ 'msg': 'Thêm thành công', RequestSuccess: true })
          }
        })
      }
    }
  })
}

exports.deleteProductType = function (req, res) {
  ProductType.findOne({ id: req.query.product_type_id }, function (err, type) {
    if (!err && type) {
      for (let i = 0; i < type.product_list_with_type.length; i++) {
        if (type.product_list_with_type[i]._id == req.query.product_Object_id) {
          type.product_list_with_type.splice(i, 1);
          type.save(function (err, uType) {
            if (err) res.send({ 'msg': err, RequestSuccess: false })
            else { res.send({ 'msg': 'Xóa thành công', RequestSuccess: true }) }
          });
          break;
        }
      }
    }
  })
}

