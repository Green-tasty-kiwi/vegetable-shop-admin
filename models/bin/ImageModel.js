module.exports = class Image extends require('sequelize').Model {
    static init(sequelize, Sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                    unique: true,
                },

                url: {
                    type: Sequelize.STRING,
                },
            },
            {
                tableName: 'images',
                paranoid: true,
                timestamps: true,
                sequelize,
            }
        );
    }
};
