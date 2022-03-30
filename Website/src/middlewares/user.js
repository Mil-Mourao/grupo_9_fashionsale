const db = require('../database/models');
const middleware = (req, res, next) => {
   
    
   db.User.findOne({
        where: {
            email: req.cookies && req.cookies.email  ? req.cookies.email : null
        },
        include: ['images']
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