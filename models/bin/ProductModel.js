module.exports = class Product extends require('sequelize').Model {
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

                name: {
                    type: Sequelize.STRING,
                    unique: true,
                },

                description: {
                    type: Sequelize.STRING,
                },

                price: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
            },
            {
                tableName: 'products',
                paranoid: true,
                timestamps: true,
                sequelize,
            }
        );
    }
};
