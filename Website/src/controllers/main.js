const products = require('../modules/products');
const controller = {
    index: (req,res) => res.render('index', {css:'index', ofertas: products.filter(p => p.ofert == true)}),
    about: (req,res) => res.render('about', {css:'about'}),
    cart: (req,res) => res.render('cart', {css:'cart'}),
}
module.exports = controller