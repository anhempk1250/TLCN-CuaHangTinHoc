
var Category = require('../model/Product_Category')
var Employee = require('../model/EmployeeAccount')
var Product = require('../model/Product')


exports.categoryList = function (req, res) {
  Category.find({ active: true }, null, { sort: { username: 1 } }).
    populate('employee').
    exec(function (err, list) {
      if (err) res.send(err)
      else {
        if (list.length > 0) {
          let temp = []
          let count = list.length;
          list.forEach(function (category) {
            let employee = new Employee(category.employee)
            let countProduct = 0;
            Product.find({ product_category_id: category._id }, function (err, productList) {
              if (err) res.send(err)
              countProduct = productList.length;
              data = {
                _id: category._id,
                id: category.id,
                name: category.name,
                property: category.property,
                summaryName: category.summaryName,
                employeeName: employee.name,
                numberOfProduct: countProduct,
                products: productList
              }
              temp.push(data);
              count -= 1;
              if (count == 0)
                res.json({ list: temp })
            })
          })
        } else { res.json({ list: [] }) }
      }
    })
}

exports.insertCategory = function (req, res) {
  let category = new Category(
    req.query
  );
  Category.findOne({ id: category.id }, function (err, category) {
    if (!err && category) {
      res.json({ msg: { msg: 'Mã sản phẩm đã tồn tại !', RequestSuccess: false } })
    } else {
      if (!category) {
        let newCategory = new Category(req.query)
        newCategory.active = true;
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
  Category.findOne({ _id: req.query._id }, function (err, category) {
    if (err) res.send(err)
    else {
      if (!category) {
        res.send({ msg: { msg: 'Category không tồn tại', RequestSuccess: false } });
      } else {
        category.id = req.query.id;
        category.name = req.query.name;
        category.property = req.query.property;
        category.summaryName = req.query.summaryName;
        category.employee = req.query.employee;
        category.save(function (err, cate) {
          if (!err) res.json({ msg: { msg: 'Cập nhập thành công !', RequestSuccess: true } })
        })
      }
    }
  })
}

exports.deleteStoreCategory = function (req, res) {
  Category.findOne({id: req.query.id}, function(err,category){
      if(err) res({msg: {msg: err}})
      else {
        if(!category) {
          res.send({msg: {msg: 'category không tồn tại',RequestSuccess: false}})
        } else {
          category.active = false;
          category.save(function(){
            res.send({msg: {msg: 'Xóa thành công',RequestSuccess: true}})
          })
        }
      }
  })
}