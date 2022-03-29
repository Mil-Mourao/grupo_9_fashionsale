const fs = require("fs");
const path = require("path");
const file = require("../models/file");

const model = {
  file: path.resolve(__dirname, "../data/products.json"),
  read: () => fs.readFileSync(model.file, "utf8"),
  write: (data) => fs.writeFileSync(model.file, JSON.stringify(data, null, 2)),
  all: () => JSON.parse(model.read()),
  generate: (data) =>
    Object({
      id: model.all().length == 0 ? 1 : model.all().pop().id + 1,
      name: data.name,
      size: data.size || ["M", "L"],
      description: data.description,
      price: parseInt(data.price),
      category: data.category,
      ofert: data.ofert ? true : false,
      discount: data.discount,
      img: data.file.length > 0 ? data.file.map(f => file.create(f).id) : null
    }),
  create: (data) => {
    let newProduct = model.generate(data);
    let all = model.all();
    all.push(newProduct);
    model.write(all);
    return newProduct;
  },
  delete: (id) => {
    model.search("id", id).img.map(e => file.delete(e));
    model.write(model.all().filter((e) => e.id != id));
  },
  search: (field, value) =>
    model.all().find((element) => element[field] == value),
  update: (id, data) => {
    let all = model.all();
    let updated = all.map((e) => {
      if (e.id == id) {
        (data.name != "") ? e.name = data.name : e.name,
        (data.price != "") ? e.price = parseInt(data.price) : e.price,
        (data.size != "") ? e.size == data.size : e.size,
        (data.description != "") ? data.description = e.description : e.description,
        e.ofert = data.ofert ? true : false,
        (data.category != "") ? e.category = data.category : e.category,
        (data.discount != "") ? e.discount = data.discount : e.discount,
         e.img =
            e.img == null ? data.file.map(f => file.create(f).id) :
            data.file  && data.file.length > 0
              ? model.search("id", id).img.map(e => file.delete(e)) && data.file.map(f => file.create(f).id) 
              : null
        return e;
      }
      return e;
    });
    model.write(updated);
    let product = model.search("id", id);
    return product;
  },
};
module.exports = model;
