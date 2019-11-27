let Product = require('../model/Product');
let ProductType = require("../model/Product_Type");

exports.productList = function (req, res) {
  Product.find().populate('product_category_id').exec(function (err, productList) {
    if (err) res.send({ msg: err })
    else {
      res.json({ list: productList });
    }
  })
}

exports.productTypeList = function (req, res) {
  ProductType.find().populate('product_category_id').exec(function (err, list) {
    if (err) res.send({ msg: { msg: err } })
    else {
      res.send({ list: list })
    }
  })
}

exports.insertProduct = function (req, res) {
  let product = new Product(req.query);
  Product.findOne({ id: product.id }, function (err, product) {
    if (!err && product) {
      res.json({ msg: { msg: 'Mã sản phẩm đã tồn tại !', RequestSuccess: false } })
    } else {
      if (!product) {
        let newProduct = new Product(req.query)
        newProduct.active = 1;
        newProduct.save(function (err) {
          if (err) res.json({ msg: err }, { RequestSuccess: false })
          else {
            res.json({ msg: { msg: 'Thêm thành công !', RequestSuccess: true } })
          }
        })
      }
    }
  })
}

exports.updateProduct = function (req, res) {
  Product.findOne({ _id: req.query._id }, function (err, product) {
    if (err) res.send(err)
    else {
      if (!product) {
        res.send({ msg: { msg: 'Product không tồn tại', RequestSuccess: false } });
      } else if (!req.query.id || !req.query.name || !req.query.price || !req.query.cost_price || !req.query.description || !req.query.producer_id
        || !req.query.product_category_id || !req.query.discount_id || !req.query.employee) {
        res.send({ msg: { msg: 'Vui lòng nhập đủ thông tin', RequestSuccess: false } });
      } else {
        product.id = req.query.id;
        product.name = req.query.Name;
        product.price = req.query.price;
        product.cost_price = req.query.cost_price;
        product.description = req.query.Description;
        product.producer_id = req.query.producer_id;
        product.product_category_id = req.query.product_category_id;
        product.employee_id = req.query.employee;
        //product.product_type_id = req.query.product_type_id;
        //product.discount_id = req.query.discount_id;
        product.save(function (err) {
          if (!err) res.json({ msg: { msg: 'Cập nhập thành công !', RequestSuccess: true } })
        })
      }
    }
  })
}

exports.deleteProduct = function (req, res) {
  Product.findOne({ _id: req.query._id, status: true }, function (err, product) {
    if (err) res.send(err)
    else {
      if (!product) {
        res.send({ msg: { msg: 'Product không tồn tại', RequestSuccess: false } });
      }else {
        product.status = 0;
        product.save(function (err) {
          if (!err) res.json({ msg: { msg: 'Xóa thành công !', RequestSuccess: true } })
        })
      }
    }
  })
}