const db = require('../../database/models');

module.exports = {
    listAll: (req, res) => {
        db.User.findAll()
        .then(users => {
            if(users.length > 0){
                 let response = {
                    meta: {
                        status: 200,
                        totalUsers: users.length,
                        url: "api/users"
                    },
                    data: [],
                } 
                
            users.forEach(user => {
             response.data.push({
                id: user.id,
                fistName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                img_id: user.image_id,
                detail: `${req.protocol}://${req.get('host')}${req.originalUrl}/${user.id}`,
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
             {include: ['images']})
        .then(user => {             
                let response = {
                    meta: {
                        status: 200,
                        url: `api/users/${user.id}`
                    },
                    data: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        avatar: `${req.protocol}://${req.get('host')}/img/Usuarios/${user.images.url}`,   
                    }
                }
            return res.json(response);
        })
        .catch(error => {
            return res.status(404).json({
                status: 404,
                msg: error.message
            })
        })
    },
    lastUser: (req, res) =>{
        db.User.findOne({order: [['id', 'DESC']]})
        .then(user => {
            let response = {
                meta: {
                    status: 200,
                    url: `${req.protocol}://${req.get('host')}/api/users/${user.id}`
                },
                data: {
                    id: user.id,
                    email: user.email,
                }
            }
            return res.json(response);
        })
        .catch(error=> {
            return res.status(404).json({
                status: 404,
                msg: error.message
            })
        })
    }
}