module.exports = class OrderProduct extends require('sequelize').Model {
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
                quantity: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
            },
            {
                tableName: 'order-products',
                paranoid: true,
                timestamps: true,
                sequelize,
            }
        );
    }

    static associate = function (models) {
        OrderProduct.belongsTo(models.OrderModel, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: 'order_id',
            as: 'order',
        });
        OrderProduct.hasOne(models.AddressModel, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: 'order_product_id',
            as: 'address',
        });
        OrderProduct.hasOne(models.ProductModel, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: 'order_product_id',
            as: 'product',
        });
        OrderProduct.hasOne(models.CityModel, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: 'order_product_id',
            as: 'city',
        });
    };
};
