const products = require("../models/product");
const file = require("../models/file");
const db = require('../database/models');
const validator = require('express-validator');
const path = require('path');
const Op = require('sequelize');
const fs = require("fs");

const controller = {
  list: (req, res) => {
    //prueba para ver si trae la BD y renderiza la vista.    
    db.Product.findAll({
      include: ['images']
    })
      .then(products => {
        res.render('products/list', { styles: ['list'], title: "Listado de productos", products })
      })

    /* res.render("products/list", {
      styles: ["list"],
      title: "Listado de Productos",
      products: products.all().map(p => Object({...p, img: p.img != null ? p.img.map(e =>file.search('id',e)) : p.img}))
    }) */
  },
  detail: (req, res) => {
    let result = products.search("id", req.params.id)
    let productShow = Object({ ...result, img: result.img != null ? result.img.map(e => file.search('id', e)) : result.img })
    return result ? res.render("products/productDetail", {
      styles: ["product"],
      title: "Detalle de producto",
      product: productShow
    }) : res.render('error', { msg: 'Producto no encontrado' })
    //res.send(productShow)
  },
  create: (req, res) =>
    res.render("products/create", {
      title: "crear producto",
      styles: ["create"],
    }),
  save: (req, res) => {
    //  orden para hacer el create
    //  create: 1 image 2 product 3 product_size     

    // req.body.file = req.files;
    // return res.send(req.body)
    // let created = products.create(req.body);
    // return res.redirect("/products/" + created.id);
    const errors = validator.validationResult(req);
    

    if (errors.isEmpty()) {
      if (req.files.length >= 1) {
        let productImages = req.files.map(image => {
          let item = {
            url: image.filename
          }
          return item
        })
      db.Image.bulkCreate(productImages)
      Promise
      .all([productImages])
      .then(([images]) =>{
        db.Product.create({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          category: req.body.category,
          ofert: req.body.ofert == "on" ? true : false,
          discount: req.body.discount,
          })        
        //db.Product.addImage(images)
        return res.redirect('/');
      })
      .catch(error => res.send(error))
    }
    
    }
  },
  update: (req, res) =>
    res.render("products/update", {
      styles: ["update"],
      title: "actualizar",
      products: products.search("id", req.params.id),
    }),
  modify: (req, res) => {
    req.body.file = req.files;
    let update = products.update(req.params.id, req.body);
    return res.redirect("/products/" + update.id);
  },
  delete: (req, res) => {
    db.Product.findByPk(req.body.id, {
      include: ["images"]
    })
    .then(producto => {
      producto.images.forEach(img => {
        if(fs.existsSync(path.resolve(__dirname, '../../public/img/Productos', img.file))){
          fs.unlinkSync(path.resolve(__dirname, '../../public/img/Productos', img.file))
        }
      });
    db.Product.destroy({
      where: [{id: req.body.id}]
    })
    .then(() => res.redirect("/products/"))
    .catch(err => console.log(err))
    //products.delete(req.body.id);
  })
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
