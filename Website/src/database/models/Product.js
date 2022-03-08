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
        },
        category: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    };

    let config = {
        tableName: 'product',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsToMany(models.Size, {
            as: "sizes",
            through: "product_sizes",
            foreignKey: "product_id",
            otherKey: "size_id",
            timestamps: false
        }),

        Product.belongsToMany(models.Image, {
            as: "images",
            through: "imagesproduct",
            foreignKey: "product_id",
            otherKey: "image_id",
            timestamps: false
        })
    }

    return Product
}