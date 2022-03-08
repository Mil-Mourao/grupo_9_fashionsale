module.exports = (sequelize, DataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ofert: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    };

    let config = {
        tableName: 'product',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.hasMany(models.Product_Size, {
            as: "product_stock",
            foreignKey: "product_id"
        }),

        Product.belongsToMany(models.Image, {
            as: "product_pic",
            through: "imagesproduct",
            foreignKey: "product_id",
            otherKey: "image_id",
            timestamps: false
        })
    }

    return Product
}