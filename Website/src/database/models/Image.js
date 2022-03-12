module.exports = (sequelize, DataTypes) => {
    let alias = 'Image';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'images',
        timestamps: false
    };
    const Image = sequelize.define(alias, cols, config)

    Image.associate = function (models) {
        Image.belongsToMany(models.Product, {
            as: "products",
            through: "imagesproduct",
            // foreignKey: "imageId",
            // otherKey: "productId",
            timestamps: false
        }),

        Image.hasMany(models.User, {
            as:"users",
            foreignKey: "image_id",
        })
    }

    return Image
}