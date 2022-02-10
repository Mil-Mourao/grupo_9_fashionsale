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
      size: data.size,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      ofert: data.ofert ? true : false,
      discount: data.discount,
      img:
        data.file.length > 0 ? data.file.map((f) => file.create(f).id) : null,
    }),
  create: (data) => {
    let newProduct = model.generate(data);
    let all = model.all();
    all.push(newProduct);
    model.write(all);
    return newProduct;
  },
  delete: (id) => {
    model.search("id", id).img.map((e) => file.delete(e));
    model.write(model.all().filter((e) => e.id != id));
  },
  search: (field, value) =>
    model.all().find((element) => element[field] == value),
  //   search: (field, value) => {
  //     console.log("--------------------------",field, value);
  //     model.all().find((element) => element[field] == value);
  //     let all = model.all();
  //     let found = all.find((element) => element[field] == value);
  //     value.name = found.name;
  //     console.log(found)
  //   },
  update: (id, data) => {
    let all = model.all();
    let updated = all.map((e) => {
      if (e.id == id) {
        e.name != "" ? e.name = data.name : e.name,
          e.price != "" ? e.price = parseInt(data.price) : e.price,
          e.size != "" ? e.size = data.size : e.size,
          //   e.size = data.size,
          e.description != "" ? e.description = data.description : e.description,
          e.category != "" ? e.category = data.category : e.category,
          e.ofert = data.ofert ? true : false,
          //   e.ofert = data.ofert ? true : false,
          e.category != "" ? e.category = data.category : e.category,
          e.discount != "" ? e.discount = data.discount : e.discount,
          (e.img =
            data.file && data.file.length > 0
              ? data.file.map((f) => file.create(f).id)
              : null);
        console.log("data:", data);
        console.log("-----------------------------------------------------");
        console.log("e:", e);
        console.log("-----------------------------------------------------");
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
