const products = require('../models/product')

const controller = {
    index: (req,res) => res.render('index',
    {styles:['index'],
    title: "Home",
    products: products.all()
    }),
    about: (req,res) => res.render('about', {css:'about'}),
}
module.exports = controller

/*
index: (req,res) => res.render('index', {css:'index', ofertas: products.filter(p => p.ofert == true)})
const products = require('../modules/products');
*/
