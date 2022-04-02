const db = require('../../database/models');

module.exports = {
    listAll: (req, res) =>{
        db.Product.findAll({include: ['sizes']})
        .then(products =>{
            if(products.length > 0){
                let response = {
                    meta: {
                        status: 200,
                        totalProducts: products.length,
                        countByCategory: {
                            hombre: products.map(e => e.category == "hombre").reduce((ant, total)=> ant + total,0),
                            mujer: products.map(e => e.category == "mujer").reduce((ant, total)=> ant + total,0),
                            accesorio: products.map(e => e.category == "accesorio").reduce((ant, total)=> ant + total,0),
                        },
                        url: "api/products"
                    },
                    data: [],
                }
                
                products.forEach(product => {
                    response.data.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        discount: product.discount ? product.discount : null,
                        category: product.category,
                        sizes: product.sizes.map(e=> e.sizes_short),
                        detail: `${req.protocol}://${req.get('host')}${req.originalUrl}/${product.id}`
                    })
                });

              return res.status(200).json(response)
            }else{
                return res.status(404).json({
                    error: 'No existen productos'
                })
            }
        })
        .catch(error => {res.status(500).json({error: error.message})})
    },
    listOne: (req, res) => {
        let id = req.params.id;
        let producto = db.Product.findByPk(id,{
            include: ['images', 'sizes']
        });
        let unidades = db.Product_Size.findAll({
            where: {product_id: id}
        });

        Promise.all([producto, unidades])
        .then(([producto, unidades]) => {
            if(producto && unidades){
                let sizeUnits =  producto.sizes.map(talle=> {
                 return   Object({
                        size: talle.sizes_short,
                        units: unidades.find(e=> e.size_id == talle.id).units
                    })});
                    
                let response ={
                    meta: {
                        status: 200,
                        url: `api/products/${producto.id}`
                    },
                    data:{
                        id: producto.id,
                        name: producto.name,
                        price: producto.price,
                        description: producto.description,
                        discount: producto.discount ? producto.discount : null,
                        category: producto.category,
                        sizes: sizeUnits,
                        images: producto.images.map(e => 
                            `${req.protocol}://${req.get('host')}/img/Productos/${e.url}`)
                    }
                }
                return res.status(200).json(response);
            }else{
                return res.status(404).json({error: 'Este producto no existe'})
            }
        })
        .catch(error => {res.status(500).json({error: error.message})})
    },
    lastProduct: (req, res) =>{
        db.Product.findOne({order: [['id', 'DESC']]})
        .then(producto => {
            if(producto){
                let response = {
                    meta: {
                        status: 200,
                        url: `${req.protocol}://${req.get('host')}/api/products/${producto.id}`
                    },
                    data: {
                        id: producto.id,
                        name: producto.name,
                    }
                }
                return res.status(200).json(response)
            }else{
                return res.status(404).json({error: 'Este producto no existe'})
            }
        })
        .catch(error => {res.status(500).json({error: error.message})})
    }

}