const MainProduct = require("../models/mainModel");

exports.getMainPage = (req, res, next) => {
    const mainProduct =  new MainProduct('Test Product Name', 'Test Product description');
    //res.render('mainpage');
    res.render('mainpage', {product: mainProduct});
}