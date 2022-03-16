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
    db.Product.findByPk(req.params.id, {include: ['images']})
      .then(product => {
          res.render('products/productDetail', {
          styles: ["product"],
          title: "Detalle de producto",
          product 
        })
      })
      .catch(error => res.send(error))



    /* let result = products.search("id", req.params.id)
    let productShow = Object({ ...result, img: result.img != null ? result.img.map(e => file.search('id', e)) : result.img })
    return result ? res.render("products/productDetail", {
      styles: ["product"],
      title: "Detalle de producto",
      product: productShow
    }) : res.render('error', { msg: 'Producto no encontrado' }) */
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
        
      if (req.files.length >= 1) {
      let productImages = req.files.map(image => {
          let item = {
            url: image.filename
          }
          return item
        })
      let arrayImagenes = db.Image.bulkCreate(productImages);
      
      let arraySizes = db.Size.findAll({
        where: {id: [Op.in] } // req.body unidades
      })
      //let algo = arraySizes.map(size => {size.units})
      
       let crearProduct = db.Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        ofert: req.body.ofert == "on" ? true : false,
        discount: req.body.discount,
        });
      
      Promise
      .all([arrayImagenes, crearProduct])
      .then(([images, producto]) =>{
         producto.addImages(images) 
        // producto.addSizes(algo)
        })
        .then(()=>{
          res.redirect('/product/' + producto.id);
        })    
      
      .catch(error => res.send(error))
        
    } 
    
    
  },
  update: (req, res) =>{
    db.Product.findByPk(req.params.id)
    .then(product => {
      res.render("products/update", {
        styles: ["update"],
        title: "Actualizar",
        product
      })
    })
  },
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
        if(fs.existsSync(path.resolve(__dirname, '../../public/img/Productos', img.url))){
          fs.unlinkSync(path.resolve(__dirname, '../../public/img/Productos', img.url))
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
