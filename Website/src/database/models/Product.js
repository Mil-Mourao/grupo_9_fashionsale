module.exports = (sequelize, DataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
    return Product
}