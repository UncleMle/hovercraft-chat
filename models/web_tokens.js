module.exports = (sequelize, DataTypes) => {
    const webTokens = sequelize.define("web_tokens", {
        token: {
            type: DataTypes.STRING('1234'),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        activated: {
            type: DataTypes.BIGINT(1),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    return webTokens;
}