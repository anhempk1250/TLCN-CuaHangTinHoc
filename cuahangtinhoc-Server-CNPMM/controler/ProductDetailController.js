let Product = require('../model/Product');

exports.productDetail = function(req, res) {
    let id = req.query.id;
    Product.findOne({id: id}).populate('images').exec(function(err,list){
        res.json(list);
    })
}
