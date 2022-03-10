module.exports = (sequelize, DataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fistName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        image_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    };
    let config = {
        tableName: 'user',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config);

      User.associate = function (models) {
        User.belongsTo(models.Image, {
            as:"avatar",
            foreignKey: "image_id"
        })
    }

    return User
}