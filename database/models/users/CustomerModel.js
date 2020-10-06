module.exports = class Customer extends require('sequelize').Model {
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

                firstName: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false,
                },
                lastName: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false,
                },
                phone: {
                    type: Sequelize.INTEGER,
                    unique: true,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false,
                },
                postcode: {
                    type: Sequelize.INTEGER,
                },
            },
            {
                tableName: 'customers',
                paranoid: true,
                timestamps: true,
                sequelize,
            }
        );
    }
};
