module.exports = (sequelize, DataTypes) => {
    let alias = 'Image';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        Image.hasMany(models.Product, {
            as: "product_pic_url",
            through: "Product_Image",
            foreignKey: "image_id",
            otherKey: "product_id",
            timestamps: false
        }),

        Image.belongsTo(models.User, {
            as:"user_pic_url",
            foreignKey: "user_id",
        })
    }

    return Image
}