const db = require("../database/models");

const controller = {
  index: (req, res) => {
    db.Product.findAll({
      include: ["images"],
    })
      .then((products) => {
        res.render("index", { styles: ["index"], title: "Home", products });
      })
      .catch((err) => res.send(err));
  },
  about: (req, res) => res.render("about", { css: "about" }),
};
module.exports = controller;
