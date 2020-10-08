module.exports = class Quantity extends require('sequelize').Model {
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

                kg: {
                    type: Sequelize.INTEGER,
                },
            },
            {
                tableName: 'quantity',
                paranoid: true,
                timestamps: true,
                sequelize,
            }
        );
    }

    static associate = function (models) {
        Quantity.belongsTo(models.ProductModel, {
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
            foreignKey: 'product_id',
            as: 'product',
        });
    };
};
