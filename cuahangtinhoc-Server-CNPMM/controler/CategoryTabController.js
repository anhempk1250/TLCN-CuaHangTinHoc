
var Category = require('../model/Product_Category')
var Employee = require('../model/EmployeeAccount')
var Product = require('../model/Product')


exports.categoryList = function (req, res) {
  Category.find().populate('employee').exec(function (err, list) {
    res.json({ list: list })
  })
}

exports.insertCategory = function (req, res) {
  let category = new Category(
    req.query
  );
  Category.findOne({ name: category.name }, function (err, category) {
    if (!err && category) {
      res.json({ msg: { msg: 'Tên này đã tồn tại !', RequestSuccess: false } })
    } else {
      if (!category) {
        let newCategory = new Category(req.query)
        newCategory.status = 1;
        newCategory.id = newCategory._id;
        newCategory.save(function (err) {
          if (err) res.json({ msg: err }, { RequestSuccess: false })
          else {
            res.json({ msg: { msg: 'Thêm thành công !', RequestSuccess: true } })
          }
        })
      }
    }
  })

}

exports.updateCategory = function (req, res) {
  Category.findOne({ id: req.query.id }, function (err, category) {
    if (err) res.send(err)
    else {
      if (!category) {
        res.send({ msg: { msg: 'Category không tồn tại', RequestSuccess: false } });
      } else {

        Product.find({ product_category_id: category.id }, function (err, productList) {
          if (productList && req.query.deletedProp) {
            let indexDeleted = req.query.deletedProp.sort(function (a, b) { return b - a });
            for (let i = 0; i < productList.length; i++) {
              let props = productList[i].description.split('___');
              for (let j = 0; j < indexDeleted.length; j++) {
                props.splice(indexDeleted[j], 1);
              }
              let str = '';
              for (let j = 0; j < props.length; j++) {
                if (j != props.length - 1)
                  str += props[j] + '___';
                else
                  str += props[j]
              }
              //console.log('2',props);
              productList[i].description = str;
              bstr += productList[i].description
              productList[i].save();
            }
            category.name = req.query.name;
            category.property = req.query.property;
            category.summaryName = req.query.summaryName;
            category.employee = req.query.employee;
            category.save(function (err, cate) {
              if (!err) {
                res.json({ msg: { msg: 'Cập nhật thành công', RequestSuccess: true } })
              }
            })
          } else {
            category.name = req.query.name;
            category.property = req.query.property;
            category.summaryName = req.query.summaryName;
            category.employee = req.query.employee;
            category.save(function (err, cate) {
              if (!err) {
                res.json({ msg: { msg: 'Cập nhật thành công', RequestSuccess: true } })
              }
            })

          }

        })
      }
    }
  })
}

exports.deleteStoreCategory = function (req, res) {
  Category.findOne({ id: req.query.id }, function (err, category) {
    if (err) res({ msg: { msg: err } })
    else {
      if (!category) {
        res.send({ msg: { msg: 'category không tồn tại', RequestSuccess: false } })
      } else {
        category.status = 0;
        category.save(function () {
          res.send({ msg: { msg: 'Xóa thành công', RequestSuccess: true } })
        })
      }
    }
  })
}