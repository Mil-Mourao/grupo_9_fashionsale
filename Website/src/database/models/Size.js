module.exports = (sequelize, DataTypes) => {
    let alias = 'Size';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
    return Size
}