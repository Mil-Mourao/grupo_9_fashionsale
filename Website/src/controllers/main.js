
const controller = {
    index: (req,res) => res.render('index', {styles:['index','general','header','footer'], title: "Home"}),
    about: (req,res) => res.render('about', {css:'about'}),
    cart: (req,res) => res.render('productCart', {styles:['carrito','general','header','footer'], title: "Mi carrito"}),
}
module.exports = controller

/*
index: (req,res) => res.render('index', {css:'index', ofertas: products.filter(p => p.ofert == true)})
const products = require('../modules/products');
*/
