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
                    allowNull: false,
                },

                price: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                meta_tag: {
                    type: Sequelize.STRING,
                },
                meta_description: {
                    type: Sequelize.STRING,
                },
                meta_keywords: {
                    type: Sequelize.STRING,
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
