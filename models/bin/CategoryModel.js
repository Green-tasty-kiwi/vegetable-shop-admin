module.exports = class Category extends require('sequelize').Model {
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
            },
            {
                tableName: 'categories',
                paranoid: true,
                timestamps: true,
                sequelize,
            }
        );
    }
};
