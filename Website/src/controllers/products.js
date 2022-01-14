//const {all,create} = require('../models/products')
const product = require('../models/product');
const controller = {
    list: (req,res) => res.render('products/list', {
        styles: ['index'],
        title: 'Listado de Productos',
        
    }),
    detail: (req,res) => res.render('products/productDetail', {styles: ['product'], title: 'Detalle de producto'}),
    create: (req, res) => res.render('products/create',{title:'crear producto'}),
    save: (req,res) => {
        req.body.file = req.files;
        let created = products.create(req.body);
        return res.redirect("/products/" + created.id)
    },
    update:(req,res) => res.render("products/update", {
        styles: ["products/create"],
        title: "actualizar",
        products: products.search("id", req.params.id)
    }),
    modify: (req,res) => {
        let update = products.update(req.params.id, req.body);
        return res.redirect("/products/" + update.id)
    }
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
 modify: (req,res) => res.render('products/modify',{css:'modify'}),
*/