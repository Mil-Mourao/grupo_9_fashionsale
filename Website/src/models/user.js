const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const model = {
  file: path.resolve(__dirname, "../data", "users.json"),
  read: () => fs.readFileSync(model.file, "utf8"),
  write: (data) => fs.writeFileSync(model.file, JSON.stringify(data, null, 2)),
  all: () => JSON.parse(model.read()),
  search: (prop, value) =>
    model.all().find((element) => element[prop] === value),
  generate: (data) =>
    Object({
      id: model.all().length == 0 ? 1 : model.all().pop().id + 1,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: bcrypt.hashSync(data.password, 10),
      avatar: data.avatar ? data.avatar : null,
      isAdmin: String(data.email).includes("@fashionsale.com"),
      isActive: true,
    }),
    create: (data) => {
        let all = model.all();
        let user = model.generate(data);
        all.push(user);
        model.write(all);
        return user;
    },
    update: (id,data) => {
      let users = model.all();
      const updated = users.map(user => user.id === id ? {
          ...user, ...data} : user)
      model.write(updated)
      return model.search('id', id)
    }
    
};

module.exports = model
