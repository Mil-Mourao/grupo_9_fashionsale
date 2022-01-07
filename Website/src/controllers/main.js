
const controller = {
    index: (req,res) => res.render('index', {css:'index', title: "Home"}),
    about: (req,res) => res.render('about', {css:'about'}),
    carrito: (req,res) => res.render('carrito', {css:'carrito'}),
}
module.exports = controller

/*
index: (req,res) => res.render('index', {css:'index', ofertas: products.filter(p => p.ofert == true)})
const products = require('../modules/products');
*/