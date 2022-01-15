const fs = require('fs');
const path = require('path');

model = {
    file: path.resolve(__dirname, '../data/products.json'),
    read: () => fs.readFileSync(model.file, 'utf8'),
    write: data => fs.writeFileSync(model.file, JSON.stringify(data,null,2)),
    all: () => JSON.parse(model.read()),
    delete: id => model.write(model.all().filter(e => e.id != id),
    )}


module.exports = model;