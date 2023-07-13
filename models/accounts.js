module.exports = (sequelize, DataTypes) => {
    const accounts = sequelize.define("accounts", {
        uuid: {
            type: DataTypes.STRING('1234'),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        useTime: {
            type: DataTypes.BIGINT(1),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastActive: {
            type: DataTypes.BIGINT(1),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    })

    return accounts;
}