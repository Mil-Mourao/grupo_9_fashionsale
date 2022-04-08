const db = require("../database/models");
const {Op} = require('sequelize');
let checkOfert = false;
const controller = {
  index: (req, res) => {
    db.Product.findAll({
      include: ["images"],
    })
      .then((products) => {
        if (products.length >= 1) {
          checkOfert = products.find((e) => e.dataValues.ofert != undefined ? true : false).ofert;
        }
        res.render("index", {
          styles: ["index"],
          title: "Home",
          products,
          checkOfert,
        });
      })
      .catch((err) => res.send(err));
  },
  about: (req, res) => res.render("about", { css: "about" }),
  search: (req, res) =>{
    if(req.query.q.trim() != ""){
      db.Product.findAll({
        include: ["images"],
        where: {
          name: {[Op.substring]: req.query.q}
        }
      })
      .then(products => {
        //res.json(products)
        res.render('searchResult', {
          title: 'Listado de productos buscados',
          styles: ['list'],
          products,
          search: req.query.q.trim()
        })
      })
    }else{
      res.redirect('/products/'),
      alert('Escribe al menos una letra para que la busqueda se concrete.')
    }
   
  }
};
module.exports = controller;
