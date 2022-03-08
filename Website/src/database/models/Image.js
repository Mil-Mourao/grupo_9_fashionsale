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
            as: "product_pic_url",
            through: "imagesproduct",
            foreignKey: "image_id",
            otherKey: "product_id",
            timestamps: false
        }),

        Image.hasOne(models.User, {
            as:"images",
            foreignKey: "image_id",
        })
    }

    return Image
}