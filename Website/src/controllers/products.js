const {all,create} = require('../models/products')
const products = require('../modules/products');
const controller = {
    list: (req,res) => res.render('products/list', {css:'list',list: products}),
    detail: (req,res) => res.render('products/detail', {css:'detail'}),
    create: (req, res) => res.render('products/create',{css:'create'}),
    modify: (req,res) => res.render('products/modify',{css:'modify'}),
}
module.exports = controller
/*
index: (req, res) => res.send({ products: all()}),
   index: (req, res) => res.render('products/list',{
    styles: styles['products/list'],
    title: 'Productos',
    productos: all()
}),
create: (req, res) => res.render('products/create',{
    styles: ['products/create'],
    title: 'Nuevo Producto',
}),
*/