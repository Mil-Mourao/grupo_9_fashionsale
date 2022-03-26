const products = require("../models/product");
const file = require("../models/file");
const db = require('../database/models');
const validator = require('express-validator');
const path = require('path');
const {Op} = require('sequelize');
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
    let producto = db.Product.findByPk(req.params.id, {include: ['images', 'sizes']})
    //let productoEncontrado = db.Product.findByPk(req.params.id, {include: ['images', 'sizes']});
    let unidades = db.Product_Size.findAll({where: {product_id: req.params.id}})
      Promise.all([producto, unidades])
      .then(([producto, unidades]) => {
        let product = Object({
          name: producto.name,
          price: producto.price,
          description: producto.description,
          category: producto.category,
          ofert: producto.ofert == "on" ? true : false,
          discount: producto.discount,
          images: producto.images,
          sizes: producto.sizes.map(talles => Object({
            id: talles.id,
            size: talles.sizes,
            units: unidades.find((e, index) => e.size_id == talles.id).units
          })),
        })
        //res.send(product);
         res.render('products/productDetail',{
          styles: ["product"],
          title: "Detalle de producto",
          product,
      
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
  create: (req, res) => {
    res.render("products/create", {
      title: "crear producto",
      styles: ["create"],
    })
  },
  save: (req, res) => {
<<<<<<< HEAD
    if (req.body.file) {
      db.Image.create({url:req.files.filename})
      .then((img) => db.Product.create({
        name: req.body.name,
      description: req.body.description,
      price: parseInt(data.price),
      category: data.category,
      ofert: data.ofert ? true : false,
      discount: data.discount,
      })
      .then(Product.addImages(img)))
    }
    //req.body.file = req.files;
    //return res.send(req.body)
    //let created = products.create(req.body);
    //return res.redirect("/products/" + created.id);
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
=======

    // req.body.file = req.files;
    // return res.send(req.body)
    // let created = products.create(req.body);
    // return res.redirect("/products/" + created.id);
    const errors = validator.validationResult(req);
     // Inicio crear Imagenes de productos
     if(errors.isEmpty()) {
      if (req.files.length >= 1) {
      let productImages = req.files.map(image => {
          let item = {
            url: image.filename
          }
          return item
        })
      let arrayImagenes = db.Image.bulkCreate(productImages);
      // Final crear Imagenes de productos
    
      // Sirve para saber si hay unidades cargadas o no 
    let control = req.body.units.reduce((anterior, nuevo) => Number(anterior) + Number(nuevo), 0);

     // Traigo el array de talles
    let sizes = db.Size.findAll();
        
     // Inicio crear Producto
    let crearProducto = db.Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    ofert: req.body.ofert == "on" ? true : false,
    discount: req.body.discount,
    });
    // Final crear Producto
  
    // Acá hago un promise.all para poder asociar el producto y las imagenes, y el producto con los talles y las unidades
      Promise
      .all([arrayImagenes, crearProducto, sizes])
      .then(([images, producto, sizes]) =>{
        producto.addImages(images);
        let unidadesSizeProduct = req.body.units.map((e,i) => {
          e = parseInt(e);
         if(e != 0 && !isNaN(e) && control != 0){
            return {
              size_id: sizes[i].id,
              product_id: producto.id,
              units: e,
            }
          }
        }).filter(e => e != undefined)        
    
    db.Product_Size.bulkCreate(unidadesSizeProduct)
        .then(() => {
          res.redirect('/products/' + producto.id)
        });               
   })
   .catch(error => {
    console.log("-----------");
    console.log(error);
    console.log("-----------");
     })
        
    }  
 } else {
  res.render("products/create", {
    title: "crear producto",
    styles: ["create"],
    errors
    })
 }
    /*    let idTallesFiltrados = unidadesFiltradas.map(e=>e.size_id)
     
    let tallesFiltradosNuevo = db.Size.findAll({
      where: {
        id: {[Op.in]: idTallesFiltrados}
      },
    }); */
  },
  update: (req, res) =>{
    
    let product = db.Product.findByPk(req.params.id, {include: ['images', 'sizes']});
    let unidades = db.Product_Size.findAll({where: {product_id: req.params.id}})
    
    Promise.all([product, unidades])
      .then(([product, unidades]) => {
      res.render('products/update',{
        styles: ["update"],
        title: "Actualizar",
        product,
        unidades
      })
    })
    .catch(error => res.send(error))
   
  },
  modify: (req, res) => {
    /* req.body.file = req.files;
    let update = products.update(req.params.id, req.body);
    return res.redirect("/products/" + update.id); */
    let errors = validator.validationResult(req)
    let id = req.params.id;
    if(errors.isEmpty()){   
    let productoCompleto = db.Product.findByPk(id, {include: ["images", "sizes"]});
    let productSizes = db.Product_Size.findAll();
    
    let control = req.body.units.reduce((anterior, nuevo) => Number(anterior) + Number(nuevo), 0);
    let updateProducto = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      ofert: req.body.ofert == "on" ? true : false,
      discount: req.body.discount
    };
    
    let updateUnidades = req.body.units.map(e => {
      e = parseInt(e);
      if(e != 0 && !isNaN(e) && control != 0){
        return {
          units: e,
        }
      }
    }).filter(e => e != undefined) 

      if(req.files.length != 0){
        let productImages = req.files.map(img => {
          return {
            url: img.filename
          }
        })
      
       Promise.all([productoCompleto, updateProducto, updateUnidades, productImages, productSizes])
        .then(([productoCompleto, updateProducto, updateUnidades, productImages, productSizes]) => {
          productoCompleto.images.forEach(img => {
            if(fs.existsSync(path.resolve(__dirname, '../../public/img/Productos', img.url))){
              fs.unlinkSync(path.resolve(__dirname, '../../public/img/Productos', img.url))
            }
          })
 
        let tallesId = productSizes.map(e => e.product_id == id ? e.id : null).filter(e => e != null)
         Promise.all([
          productImages.forEach((img, i) => {
         
            db.Image.update({
              url: img.url
            }, {where: {id: productoCompleto.images[i].id}})
          }),
           updateUnidades.forEach((e, i) => {
          
            db.Product_Size.update({
              units: e.units
            }, {where: {id: tallesId[i]}})
          })
        ])
        .then(() => {
          db.Product.update(updateProducto, {where: {id: id}})
          res.redirect(`/products/${id}`)
        })
        })
        .catch(err => res.send(err))


      } else {
        Promise.all([updateProducto, updateUnidades, productSizes])
        .then(([updateProducto, updateUnidades, productSizes]) => {
        let tallesId = productSizes.map(e => e.product_id == id ? e.id : null).filter(e => e != null)
       Promise.all([ updateUnidades.forEach((e, i) => {
            db.Product_Size.update({
              units: e.units
            }, {where: {id: tallesId[i]}})
          })
        ]).then(() => {
                  db.Product.update(updateProducto, {where: {id: id}})
          res.redirect(`/products/${id}`)
        })
        })
        .catch(err => res.send(err))
      }
    }else{
      let product = db.Product.findByPk(id, {include: ['images', 'sizes']});
      let unidades = db.Product_Size.findAll({where: {product_id: id}})
      
      Promise.all([product, unidades])
        .then(([product, unidades]) => {
        res.render('products/update',{
          styles: ["update"],
          title: "Actualizar",
          product,
          unidades,
          errors
        })
      })
    }

>>>>>>> a12d8b2287ee1f74959d3021646b4689e7a8ff13
  },
  delete: (req, res) => {
    db.Product.findByPk(req.body.id, {
      include: ["images", "sizes"]
    })
    .then(producto => {
      producto.images.forEach(img => {
        if(fs.existsSync(path.resolve(__dirname, '../../public/img/Productos', img.url))){
          fs.unlinkSync(path.resolve(__dirname, '../../public/img/Productos', img.url))
        }
        db.Image.destroy({where: [{id: img.id}]})
      });
    db.Product.destroy({
      where: [{id: req.body.id}]
    })
    .then(() => res.redirect("/products/"))
    .catch(err => res.send(err))
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
