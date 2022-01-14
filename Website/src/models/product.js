const fs = require('fs');
const path = require('path');

module.exports = {
    file: path.resolve(__dirname, '../data/products.json'),
    read: () => fs.readFileSync(this.file, 'utf8'),
    write: data => fs.writeFileSync(this.file, JSON.stringify(data,null,2)),
    all: () => JSON.parse(this.read()),
    
}