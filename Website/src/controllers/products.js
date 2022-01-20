const products = require("../models/product");
const file = require("../models/file");

const controller = {
  list: (req, res) =>
    res.render("products/list", {
      styles: ["list"],
      title: "Listado de Productos",
      products: products.all(),
    }),
  detail: (req, res) => {
    res.render("products/productDetail", {
      styles: ["product"],
      title: "Detalle de producto",
      product: products.search("id", req.params.id),
    });
  },
  create: (req, res) =>
    res.render("products/create", {
      title: "crear producto",
      styles: ["create"],
    }),
  save: (req, res) => {
    req.body.file = req.files;
    //return res.send(req.body)
    let created = products.create(req.body);
    return res.redirect("/products/" + created.id);
  },
  update: (req, res) =>
    res.render("products/update", {
      styles: ["products/create"],
      title: "actualizar",
      products: products.search("id", req.params.id),
    }),
  modify: (req, res) => {
    let update = products.update(req.params.id, req.body);
    return res.redirect("/products/" + update.id);
  },
  delete: (req, res) => {
    products.delete(req.body.id);
    return res.redirect("/products/");
  },
};

module.exports = controller;
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
