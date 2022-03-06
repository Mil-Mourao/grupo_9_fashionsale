module.exports = (sequelize, DataTypes) => {
    let alias = 'Product_Size';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        id_size: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },

        id_product: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },

        units: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        }
    };
    let config = {
        tableName: 'size',
        timestamps: false
    };
    const Product_Size = sequelize.define(alias, cols, config)

    Product_Size.associate = function (models) {
        Product_Size.belongsTo(models.Size, {
            as: "size",
            foreignKey: "id"
        }),

        Product_Size.belongsTo(models.Product, {
            as: "product_stock_qty",
            foreignKey: "id"
        })
    }
    return Size
}