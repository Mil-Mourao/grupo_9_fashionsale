module.exports = (sequelize, DataTypes) => {
    let alias = 'Size';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        sizes: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        sizes_short: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    };
    let config = {
        tableName: 'size',
        timestamps: false
    };
    const Size = sequelize.define(alias, cols, config)

    Size.associate = function (models) {
        Size.belongsToMany(models.Product, {
            as: "products",
            through: "product_sizes",
            foreignKey: "size_id",
            otherKey: "product_id",
            timestamps: false
        })
    }
    return Size
}