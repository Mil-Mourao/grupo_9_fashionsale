const file = require('../models/file');

const controller = {
    store: (req, res) => res.send(req.files.map((f) => file.create(f))),
}

module.exports = controller