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
                status: {
                    type: Sequelize.ENUM('enabled', 'in_stock', 'disabled'),
                    defaultValue: 'enabled',
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
    isInStock() {
        return this.status === 'in_stock';
    }
    isDisabled() {
        return this.status === 'disabled';
    }
    static associate = function (models) {
        Product.belongsTo(models.CategoryModel, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: 'category_id',
            as: 'category',
        });
        Product.hasOne(models.QuantityModel, {
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
            foreignKey: 'product_id',
            as: 'quantity',
        });
        Product.hasOne(models.ImageModel, {
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
            foreignKey: 'product_id',
            as: 'image',
        });
    };
};
