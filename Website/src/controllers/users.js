const validator = require("express-validator");
const db = require("../database/models");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const controller = {
  login: (req, res) =>
    res.render("users/login", { styles: ["login"], title: "Log in" }),
  register: (req, res) =>
    res.render("users/register", { styles: ["register"], title: "Registro" }),
  profile: (req, res) => {
    db.User.findByPk(req.session.user.id, {
      include: ["images"],
    })
      .then((user) => {
        res.render("users/profile", {
          styles: ["profile"],
          title: "Perfil | " + user.firstName,
          user,
        });
      })
      .catch((error) => res.send(error));
  },
  updateProfile: (req, res) => {
    db.User.findByPk(req.session.user.id, {
      include: ["images"],
    })
      .then((user) => {
        res.render("users/updateProfile", {
          styles: ["profile"],
          title: "Perfil | " + user.firstName,
          user,
        });
      })
      .catch((error) => res.send(error));
  },
  access: (req, res) => {
    const errors = validator.validationResult(req);
    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          email: req.body.email,
        },
        include: ["images"],
      })
        .then((user) => {
          req.body.remember
            ? res.cookie("email", req.body.email, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
              })
            : null;
          req.session.user = user;
          res.redirect("/users/profile");
        })
        .catch((error) => res.send(error));
    } else {
      return res.render("users/login", {
        title: "Log in",
        styles: ["login"],
        errors: errors.mapped(),
        old: req.body,
      });
    }
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
        .then((user) => res.redirect("/users/login"))
        .catch((error) => res.send(error));
    } else {
      return res.render("users/register", {
        errors: errors.mapped(),
        old: req.body,
        title: "Registro",
        styles: ["register"],
      });
    }
  },
  uploadAvatar: (req, res) => {
    if (req.file) {
      let searchUser = db.User.findByPk(req.session.user.id, {
        include: ["images"],
      });

      let crearAvatarNuevo = db.Image.create({
        url: req.file ? req.file.filename : null,
      });
      Promise.all([searchUser, crearAvatarNuevo])
        .then(([viejo, avatarNuevo]) => {
          if (req.session.user.image_id !== 1) {
            if (
              fs.existsSync(
                path.resolve(
                  __dirname,
                  "../../public/img/Usuarios",
                  viejo.images.url
                )
              )
            ) {
              fs.unlinkSync(
                path.resolve(
                  __dirname,
                  "../../public/img/Usuarios",
                  viejo.images.url
                )
              );
            }
          }
          db.User.update(
            { image_id: avatarNuevo.id },
            {
              where: {
                id: req.session.user.id,
              },
            }
          ).then(() => {
            db.User.findByPk(req.session.user.id, { include: ["images"] })
              .then((user) => {
                req.session.user = user;
                if (viejo.image_id !== 1) {
                  db.Image.destroy({ where: [{ id: viejo.image_id }] })
                    .then(() => {
                      res.redirect("/users/profile");
                    })
                    .catch((err) => console.log(err));
                }
                res.redirect("/users/profile");
              })
              .catch((err) => console.log(err));
          });
        })
        .catch((err) => console.log(err));
    } else {
      res.render("users/profile", {
        styles: ["profile"],
        title: "Perfil | " + req.session.user.firstName,
        user: req.session.user,
        error: "Debes seleccionar un archivo.",
      });
    }
  },
  logout: (req, res) => {
    delete req.session.user;
    res.cookie("email", null, { maxAge: -1 });
    return res.redirect("/");
  },
};

module.exports = controller;
