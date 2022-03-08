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
        Size.hasMany(models.Product_Size, {
            as: "size_stock",
            foreignKey: "id_size"
        })
    }
    return Size
}