module.exports = class Address extends require('sequelize').Model {
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
                street: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                house: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                appartment: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
            },
            {
                tableName: 'addresses',
                paranoid: true,
                timestamps: true,
                sequelize,
            }
        );
    }
};
