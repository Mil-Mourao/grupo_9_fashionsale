//const user = require('../models/user');
const db = require('../database/models');
const middleware = (req, res, next) => {
   
    db.User.findOne({
        where: {
            email: req.cookies && req.cookies.user ? req.cookies.user : null
        }
    })
    .then(user => {
        let logged = user;

        if(req.session && req.session.user){
            logged = req.session.user;
        }
        
        res.locals.user = logged;
        
        next();    
    })
    .catch(error => res.send(error))
   
   
}
module.exports = middleware