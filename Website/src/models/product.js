const fs = require('fs');
const path = require('path');

model = {
    file: path.resolve(__dirname, '../data/products.json'),
    read: () => fs.readFileSync(model.file, 'utf8'),
    write: data => fs.writeFileSync(model.file, JSON.stringify(data,null,2)),
    all: () => JSON.parse(model.read()),
    
}

module.exports = model;