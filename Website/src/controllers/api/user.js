const db = require('../../database/models');

module.exports = {
    listAll: (req, res) => {
        
        db.User.findAll({
            include: ['images']}, {attributes: ['id', 'firstName', 'lastName', 'email']})
        .then(users => {
            if(users.length > 0){
                let response = {
                    meta: {
                        status: 200,
                        countUsers: users.length
                    },
                    data: []
                }
                
            users.forEach(user => {
                response.data.push({
                    id: user.id,
                    fistName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    urlUser: `${req.protocol}://${req.get('host')}${req.originalUrl}`,

                })
            });
            return res.status(200).json(response);

            }else{
                return res.status(404).json({error: 'No existen usuarios'})
            }
        })
        .catch(error => res.status(500).json({error: 'Sin conexión con la base'}));

    },
    listOne: (req, res) => {
        db.User.findByPk(req.params.id,
             {include: ['images']},
             {attributes: ['id', 'firstName', 'lastName', 'email']})
    }
}