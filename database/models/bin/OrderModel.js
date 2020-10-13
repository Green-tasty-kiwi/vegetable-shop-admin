module.exports = class Order extends require('sequelize').Model {
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
                status: {
                    type: Sequelize.ENUM(
                        'new',
                        'invoiced ',
                        'cancelled',
                        'fulfilled '
                    ),
                    defaultValue: 'new',
                },
            },
            {
                tableName: 'orders',
                paranoid: true,
                timestamps: true,
                sequelize,
            }
        );
    }
    isInvoiced() {
        return this.status === 'invoiced';
    }
    isCancelled() {
        return this.status === 'cancelled';
    }
    isFulfilled() {
        return this.status === 'fulfilled';
    }
    static associate = function (models) {
        Order.hasOne(models.CustomerModel, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: 'order_id',
            as: 'customer',
        });
        Order.hasMany(models.OrderProductsModel, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: 'order_id',
            as: 'order_products',
        });
    };
};
