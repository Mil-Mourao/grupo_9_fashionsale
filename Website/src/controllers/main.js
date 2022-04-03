const db = require("../database/models");
let checkOfert = false;
const controller = {
  index: (req, res) => {
    db.Product.findAll({
      include: ["images"],
    })
      .then((products) => {
        if (products.length == 1) {
          console.log("-----entre por if");
          checkOfert = products.find((e) => e.dataValues.ofert != undefined ? true : false).ofert;
          console.log(checkOfert);
          console.log("---------");
        } else if(products.length > 1){
          console.log("-----entre por else");
          checkOfert = products.find((e) => e.dataValues.ofert != undefined ? true : false).ofert;
          console.log(checkOfert);
          console.log("---------");
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
};
module.exports = controller;
