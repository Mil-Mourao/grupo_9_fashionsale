const fs = require('fs');
const path = require('path');

model = {
    file: path.resolve(__dirname, '../data/products.json'),
    generate: data => Object({
        id: model.all().length == 0 ? 1 : model.all().pop().id +1,
        name: data.name,
        price: parseInt(data.precio),
        offert: data.offert ? true : false}),
        /*imagen: data.files.map (f => file.create(f).id)}),*/
    read: () => fs.readFileSync(model.file, 'utf8'),
    write: data => fs.writeFileSync(model.file, JSON.stringify(data,null,2)),
    all: () => JSON.parse(model.read()),
    delete: id => model.write(model.all().filter(e => e.id != id)),
    update: (id, data) => {
        let all = model.all()
        let updated = all.map(e=>{
            if(e.id == id) {
                e.name = data.name,
                e.price = data.price,
                e.size = data.size,
                e.description = data.description,
                e.offert = data.offert ? true : false,
                e.category = data.category
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