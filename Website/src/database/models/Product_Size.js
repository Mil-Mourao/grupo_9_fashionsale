module.exports = (sequelize, DataTypes) => {
    let alias = 'Product_Size';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        size_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        units: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    };
    let config = {
        tableName: 'product_sizes',
        timestamps: false
    };
    const Product_Size = sequelize.define(alias, cols, config)

    Product_Size.associate = function (models) {
        Product_Size.belongsTo(models.Size, {
            as: "size",
            foreignKey: "size_id"
        }),

        Product_Size.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        })
    }
    return Product_Size
}