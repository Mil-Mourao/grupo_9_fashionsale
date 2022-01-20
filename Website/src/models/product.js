const fs = require('fs');
const path = require('path');
const file = require('../models/file');

model = {
    file: path.resolve(__dirname, '../data/products.json'),
    read: () => fs.readFileSync(model.file, 'utf8'),
    write: data => fs.writeFileSync(model.file, JSON.stringify(data,null,2)),
    all: () => JSON.parse(model.read()),
    generate: data => Object({
        id: model.all().length == 0 ? 1 : model.all().pop().id +1,
        name: data.name,
        size: data.size,
        description: data.description,
        price: parseFloat(data.price),
        category: data.category,
        ofert: data.ofert ? true : false,
        //img: data.image ? data.image : ["default.jpg"],
        discount: data.discount,
        img: data.file.map (f => file.create(f).id),
        }),
    create: data => {
        let newProduct = model.generate(data);
        let all = model.all();
        all.push(newProduct);
        model.write(all);
        return newProduct
    },    
    delete: id => model.write(model.all().filter(e => e.id != id)),
    search: (field, value) => model.all().find(element => element[field] == value),
    update: (id, data) => {
        let all = model.all()
        let updated = all.map(e=>{
            if(e.id == id) {
                e.name = data.name,
                e.price = parseInt(data.price),
                e.size = data.size,
                e.description = data.description,
                e.category = data.category,
                e.ofert = data.ofert ? true : false,
                e.category = data.category,
                e.img = data.image,
                e.discount = data.discount
            return e
            }
            return e   
        })
        model.write(updated)
        let product = model.search('id',id)
        return product
    }
}


module.exports = model;