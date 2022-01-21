const products = require('../models/product')
const file = require('../models/file')

const controller = {
    index: (req,res) => res.render('index',
    {styles:['index'],
    title: "Home",
    products: products.all().map(p => Object({...p, img: p.img.map(e =>file.search('id',e))}))
    }),
    about: (req,res) => res.render('about', {css:'about'}),
}
module.exports = controller

/*
index: (req,res) => res.render('index', {css:'index', ofertas: products.filter(p => p.ofert == true)})
const products = require('../modules/products');
*/
