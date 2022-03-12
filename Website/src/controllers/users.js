const validator = require("express-validator");
const db = require('../database/models');
//const user = require("../models/user");



const controller = {
  login: (req, res) =>
    res.render("users/login", { styles: ["login"], title: "Log in" }),
  register: (req, res) =>
    res.render("users/register", { styles: ["register"], title: "Registro" }),
  profile: (req, res) => {
    db.User.findOne({
      where: {
        email: req.session.user.email
      }
      
      }, {include: ["avatar"]})
      .then(user => {
        return res.render("users/profile",{
          styles: ["profile"],
          title: `Perfil | {req.body.nombre}`,
          user
        })
      })
      .catch(error => res.send(error));  
  
    //res.render("users/profile", { styles: ["profile"], title: "Perfil" })
  },
  access: (req, res) => {
    const errors = validator.validationResult(req);
    if (errors.isEmpty()){

      db.User.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(() => {
          req.body.remember ?
          res.cookie("email", req.session.user.email, {maxAge: 1000*60*60*24*7})
          : null;
        res.redirect('/users/profile');
      })
      .catch(error => res.send(error));
    }else{
      return res.render("users/login", {
        title: 'Log in',
        styles: ["login"],
        errors: errors.mapped(),
        old: req.body,
      });
    }      
    
 /*    if (errors.isEmpty()) {
      
      req.session.user = user.search("email", req.body.email);
    
      req.body.remember
        ? res.cookie("user", req.session.user.email, {maxAge:  1000*60*60*24*7})
        : null;    
      res.redirect("/users/profile");      
    
    } else {
       return res.render("users/login", {
        title: 'Log in',
        styles: ["login"],
        errors: errors.mapped(),
        old: req.body,
      });
    }  */     
  },
  save: (req, res) => {
    
    const errors = validator.validationResult(req);
    if (errors.isEmpty()) {
      db.User.create({
        firstName: req.body.name.trim(),
        lastName: req.body.lastName.trim(),
        email: req.body.email.trim(),
        password: bcrypt.hashSync(req.body.password, 10),
        image_id: req.body.avatar ? req.body.avatar : null,
        isAdmin: String(req.body.email).includes("@fashionsale.com"),
        isActive: true,
      })
      .then(()=> res.redirect('/users/login'))
      .catch(error => res.send(error))
      /* const create = user.create(req.body);
      return res.redirect("/users/login"); */
    } else {
        return res.render("users/register", {
        errors: errors.mapped(),
        old: req.body,
        title: 'Registro',
        styles: ["register"]
      });
    } 
    
    //return errors.isEmpty() ? res.send(user.create(req.body)) : res.send(errors.mapped()) ;
  },
  uploadAvatar: (req, res) => {

    // Orden para cargar la imagen del usuario//avatar
    // create image(obtengo el id), 2 update de user (image_id = id -> ese id es el q se crea con la imagen)
    db.Image.create({
      url: req.files ? req.files[0].filename : null
    })
    .then(img => {
      db.User.update({image_id: img.id},
          {
            where: {
              id: req.session.user.id
            }
          })
      })
    .then(user => {
      req.session.user = user;
    })
    res.redirect('/users/profile')
  },
/* 
    let update = user.update(req.session.user.id, {
      avatar: req.files ? req.files[0].filename : null});
      req.session.user = update;
      return res.redirect('/users/profile') */
  logout: (req, res) => {
    delete req.session.user;
    res.cookie("user", null, { maxAge: -1 });
    return res.redirect("/");
  },
};

module.exports = controller;