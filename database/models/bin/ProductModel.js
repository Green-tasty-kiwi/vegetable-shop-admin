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

    static associate = function (models) {
        Product.hasOne(models.ImageModel, {
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
            foreignKey: 'image_id',
            as: 'image',
        });
        Product.hasOne(models.CategoryModel, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: 'category_id',
            as: 'category',
        });
        Product.hasOne(models.QuantityModel, {
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
            foreignKey: 'quantity_id',
            as: 'quantity',
        });
    };
};
