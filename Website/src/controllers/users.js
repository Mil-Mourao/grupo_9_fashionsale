const validator = require("express-validator");
const db = require('../database/models');
//const user = require("../models/user");
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');


const controller = {
  login: (req, res) =>
    res.render("users/login", { styles: ["login"], title: "Log in" }),
  register: (req, res) =>
    res.render("users/register", { styles: ["register"], title: "Registro" }),
  profile: (req, res) => {
    db.User.findByPk(req.session.user.id,{
      include: ["images"]
     })
      .then(user => {
        res.render("users/profile",{
        styles: ["profile"],
        title: "Perfil | " + user.firstName,
        user,
      })
    })
    .catch(error => res.send(error));

    /* 
    const usuario = db.User.findOne({
      where: {
        email: req.session.user.email
      }
      
      }, {include: ["images"]});
    const avatar = db.Image.findOne({
      where: {
        id: req.session.user.image_id
      }
    });
    Promise
      .all([usuario, avatar])
      .then(([user, img]) => {
          return res.render("users/profile",{
          styles: ["profile"],
          title: "Perfil | " + user.firstName,
          user,
          img
        }) 
      })
      .catch(error => res.send(error));
   */
    //res.render("users/profile", { styles: ["profile"], title: "Perfil" })
  },
  updateProfile: (req, res) => {
    db.User.findByPk(req.session.user.id,{
      include: ["images"]
     })
      .then(user => {
        res.render("users/updateProfile",{
        styles: ["profile"],
        title: "Perfil | " + user.firstName,
        user,
      })
    })
    .catch(error => res.send(error));
  },
    access: (req, res) => {
    const errors = validator.validationResult(req);
    if (errors.isEmpty()){

      db.User.findOne({
        where: {
          email: req.body.email
        }, include: ['images']
      })
      .then(user => {
          req.body.remember ?
          res.cookie("email", req.body.email, {maxAge: 1000*60*60*24*7})
          : null;
          req.session.user = user;
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
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
        email: req.body.email.trim(),
        password: bcrypt.hashSync(req.body.password.trim(), 10),
        image_id: 1,
        isAdmin: req.body.email.includes("@fashionsale.com") ? true : false,
        isActive: true,
      })
      .then(user => res.redirect('/users/login'))
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
      
    if(req.file){    
    let searchUser = db.User.findByPk(req.session.user.id, {
      include: ['images']
    });

    let crearAvatarNuevo = db.Image.create({
      url: req.file ? req.file.filename : null
    })
    Promise
    .all([searchUser, crearAvatarNuevo])
    .then(([viejo, avatarNuevo]) => {
      if(req.session.user.image_id !== 1){
        if (fs.existsSync(path.resolve(__dirname, '../../public/img/Usuarios', viejo.images.url))){
          fs.unlinkSync(path.resolve(__dirname, '../../public/img/Usuarios', viejo.images.url))
        }
      }      
      db.User.update({image_id: avatarNuevo.id},
          {
            where: {
              id: req.session.user.id
            }           
          })
      .then(() =>{
        db.User.findByPk(req.session.user.id,
          {include: ['images']})
        .then(user => {
          req.session.user = user;
          if(viejo.image_id !== 1){
          db.Image.destroy({where: [{id: viejo.image_id}]})
          .then(()=>{
            res.redirect('/users/profile');
          })
          .catch(err => console.log(err))
          }
          res.redirect('/users/profile');
        })
        .catch(err => console.log(err))
      })     
    })
    .catch(err => console.log(err))
  }else {
    res.render("users/profile",{
      styles: ["profile"],
      title: "Perfil | " + req.session.user.firstName,
      user: req.session.user,
      error: "Debes seleccionar un archivo.",
      
    })
    }
  },
/* 
    let update = user.update(req.session.user.id, {
      avatar: req.files ? req.files[0].filename : null});
      req.session.user = update;
      return res.redirect('/users/profile') */
  logout: (req, res) => {
    delete req.session.user;
    res.cookie("email", null, { maxAge: -1 });
    return res.redirect("/");
  },
};

module.exports = controller;