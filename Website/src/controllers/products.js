const db = require("../database/models");
const validator = require("express-validator");
const path = require("path");
const { Op } = require("sequelize");
const fs = require("fs");

const controller = {
  list: (req, res) => {
    db.Product.findAll({
      include: ["images"],
    }).then((products) => {
      res.render("products/list", {
        styles: ["list"],
        title: "Listado de productos",
        products,
      });
    });
  },
  detail: (req, res) => {
    let producto = db.Product.findByPk(req.params.id, {
      include: ["images", "sizes"],
    });
    let unidades = db.Product_Size.findAll({
      where: { product_id: req.params.id },
    });
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
          sizes: producto.sizes.map((talles) =>
            Object({
              id: talles.id,
              size: talles.sizes,
              units: unidades.find((e, index) => e.size_id == talles.id).units,
            })
          ),
        });
        //res.send(product);
        res.render("products/productDetail", {
          styles: ["product"],
          title: "Detalle de producto",
          product,
        });
      })
      .catch((error) => res.send(error));
  },
  create: (req, res) =>
    res.render("products/create", {
      title: "crear producto",
      styles: ["create"],
    }),
  save: (req, res) => {
    const errors = validator.validationResult(req);
    if (errors.isEmpty()) {
      if (req.files.length >= 1) {
        let productImages = req.files.map((image) => {
          let item = {
            url: image.filename,
          };
          return item;
        });
        let arrayImagenes = db.Image.bulkCreate(productImages);

        // Sirve para saber si hay unidades cargadas o no
        let control = req.body.units.reduce(
          (anterior, nuevo) => Number(anterior) + Number(nuevo),0);

        let sizes = db.Size.findAll();

        let crearProducto = db.Product.create({
          name: req.body.name.trim(),
          price: req.body.price.trim(),
          description: req.body.description,
          category: req.body.category,
          ofert: req.body.ofert == "on" ? true : false,
          discount: req.body.discount.trim(),
        });

        Promise.all([arrayImagenes, crearProducto, sizes])
          .then(([images, producto, sizes]) => {
            producto.addImages(images);
            let unidadesSizeProduct = req.body.units
              .map((e, i) => {
                e = parseInt(e);
                if (e != 0 && !isNaN(e) && control != 0) {
                  return {
                    size_id: sizes[i].id,
                    product_id: producto.id,
                    units: e,
                  };
                }
              })
              .filter((e) => e != undefined);

            db.Product_Size.bulkCreate(unidadesSizeProduct).then(() => {
              res.redirect("/products/");
            });
          })
          .catch((error) => console.log(error));
      }
    } else {
      if (req.files){
        req.files.forEach(image => {
        fs.unlinkSync(path.resolve(__dirname,"../../public/img/Productos",image.filename));
        })
      }     
      res.render("products/create", {
        title: "crear producto",
        styles: ["create"],
        old: req.body,
        errors: errors.mapped(),
      });
    }
  },
  update: (req, res) => {
    let product = db.Product.findByPk(req.params.id, {
      include: ["images", "sizes"],
    });
    let unidades = db.Product_Size.findAll({
      where: { product_id: req.params.id },
    });

    Promise.all([product, unidades])
      .then(([product, unidades]) => {
        res.render("products/update", {
          styles: ["update"],
          title: "Actualizar",
          product,
          unidades,
        });
      })
      .catch((error) => res.send(error));
  },
  modify: (req, res) => {
    let errors = validator.validationResult(req);
    let id = req.params.id;
    if (errors.isEmpty()) {
      let productoCompleto = db.Product.findByPk(id, {
        include: ["images", "sizes"],
      });
      let productSizes = db.Product_Size.findAll();
 
      let unidades = Array.isArray(req.body.units) ? req.body.units : new Array(req.body.units);
      
      let control = unidades.reduce(
        (anterior, nuevo) => Number(anterior) + Number(nuevo),0);

        let updateProducto = {
        name: req.body.name.trim(),
        price: req.body.price.trim(),
        description: req.body.description,
        category: req.body.category,
        ofert: req.body.ofert == "on" ? true : false,
        discount: req.body.discount.trim(),
      };

      let updateUnidades = unidades
        .map((e) => {
          e = parseInt(e);
          if (e != 0 && !isNaN(e) && control != 0) {
            return {
              units: e,
            };
          }
        })
        .filter((e) => e != undefined);

      if (req.files.length != 0) {
        let productImages = req.files.map((img) => {
          return {
            url: img.filename,
          };
        });

        Promise.all([
          productoCompleto,
          updateProducto,
          updateUnidades,
          productImages,
          productSizes,
        ])
          .then(
            ([
              productoCompleto,
              updateProducto,
              updateUnidades,
              productImages,
              productSizes,
            ]) => {
              productoCompleto.images.forEach((img) => {
                if (
                  fs.existsSync(
                    path.resolve(
                      __dirname,
                      "../../public/img/Productos",
                      img.url
                    )
                  )
                ) {
                  fs.unlinkSync(
                    path.resolve(
                      __dirname,
                      "../../public/img/Productos",
                      img.url
                    )
                  );
                }
              });

              let tallesId = productSizes
                .map((e) => (e.product_id == id ? e.id : null))
                .filter((e) => e != null);
              Promise.all([
                productImages.forEach((img, i) => {
                  db.Image.update(
                    {
                      url: img.url,
                    },
                    { where: { id: productoCompleto.images[i].id } }
                  );
                }),
                updateUnidades.forEach((e, i) => {
                  db.Product_Size.update(
                    {
                      units: e.units,
                    },
                    { where: { id: tallesId[i] } }
                  );
                }),
              ]).then(() => {
                db.Product.update(updateProducto, { where: { id: id } });
                res.redirect(`/products/${id}`);
              });
            }
          )
          .catch((err) => res.send(err));
      } else {
        Promise.all([updateProducto, updateUnidades, productSizes])
          .then(([updateProducto, updateUnidades, productSizes]) => {
            let tallesId = productSizes
              .map((e) => (e.product_id == id ? e.id : null))
              .filter((e) => e != null);
            Promise.all([
              updateUnidades.forEach((e, i) => {
                db.Product_Size.update(
                  {
                    units: e.units,
                  },
                  { where: { id: tallesId[i] } }
                );
              }),
            ]).then(() => {
              db.Product.update(updateProducto, { where: { id: id } });
              res.redirect(`/products/${id}`);
            });
          })
          .catch((err) => res.send(err));
      }
    } else {
      let product = db.Product.findByPk(id, { include: ["images", "sizes"] });
      let unidades = db.Product_Size.findAll({ where: { product_id: id } });

      Promise.all([product, unidades]).then(([product, unidades]) => {
        res.render("products/update", {
          styles: ["update"],
          title: "Actualizar",
          product,
          unidades,
          errors,
        });
      });
    }
  },
  delete: (req, res) => {
    db.Product.findByPk(req.body.id, {
      include: ["images", "sizes"],
    })
    .then(producto => {
          producto.images.forEach((img) => {
            if (fs.existsSync(path.resolve(__dirname, "../../public/img/Productos", img.url))) {
              fs.unlinkSync(path.resolve(__dirname, "../../public/img/Productos", img.url))}
            })

      let deleteImages = producto.images.forEach(img => db.Image.destroy({ where:{ id: img.id }}));

      Promise.all([deleteImages])
          .then(() => {
            db.Product.destroy({where: {id: req.body.id}})
            .then(()=>{
              res.redirect("/products/")
            })
          })
          .catch(err => console.log(err));
      })
    .catch((err) => console.log(err));
  },
};

module.exports = controller;
