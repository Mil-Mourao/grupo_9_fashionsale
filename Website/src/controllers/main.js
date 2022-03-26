const products = require('../models/product')
const file = require('../models/file')
const db = require('../database/models')

const controller = {
    index: (req,res) =>{
        db.Product.findAll({
            include: ['images']
        })
        .then(products => {
        res.render('index',
            {styles:['index'],
            title: "Home",
            products})
        })
        .catch(err => res.send(err))
}
    ,
    about: (req,res) => res.render('about', {css:'about'}),
}
module.exports = controller

/*
index: (req,res) => res.render('index', {css:'index', ofertas: products.filter(p => p.ofert == true)})
const products = require('../modules/products');
*/
