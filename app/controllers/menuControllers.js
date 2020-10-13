const express = require('express');
const router = express.Router();
const path = require('path');
const Model = require('../../database/index');
const { Op } = require('sequelize');
const productApi = require('../../api/product.api');

router
    .get('/', function (request, response) {
        response.render('index');
    })
    .get('/profile', function (request, response) {
        response.render('profile');
    })
    .get('/products_grid', async (request, response, next) => {
        try {
            const products = await Model.ProductModel.findAll({
                raw: true,
                nest: true,
                include: [
                    { model: Model.CategoryModel, as: 'category' },
                    { model: Model.ImageModel, as: 'image' },
                ],
            });

            response.render('ecommerce_products_grid', { products });
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/products', async (request, response, next) => {
        const searchName = request.query.product_name;

        if (searchName) {
            const products = await Model.ProductModel.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${searchName}%`,
                    },
                },
                raw: true,
                nest: true,
                include: [
                    { model: Model.CategoryModel, as: 'category' },
                    { model: Model.QuantityModel, as: 'quantity' },
                ],
            });
            response.render('ecommerce_product_list', { products });
            return;
        }

        try {
            const products = await Model.ProductModel.findAll({
                raw: true,
                nest: true,
                include: [
                    { model: Model.CategoryModel, as: 'category' },
                    { model: Model.QuantityModel, as: 'quantity' },
                ],
            });

            response.render('ecommerce_product_list', { products });
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/products/create', async (request, response, next) => {
        try {
            const categories = await Model.CategoryModel.findAll({
                raw: true,
            });
            response.render('ecommerce_product', { categories });
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/products/:productId/edit', async (request, response, next) => {
        try {
            productId = request.params.productId;
            const product = await Model.ProductModel.findOne({
                where: {
                    id: `${productId}`,
                },
                raw: true,
                nest: true,
                include: [
                    { model: Model.CategoryModel, as: 'category' },
                    { model: Model.QuantityModel, as: 'quantity' },
                    { model: Model.ImageModel, as: 'image' },
                ],
            });
            response.render('ecommerce_product_edit', { product });
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/products/:productId', async (request, response, next) => {
        try {
            productId = request.params.productId;
            const product = await Model.ProductModel.findOne({
                where: {
                    id: `${productId}`,
                },
                raw: true,
                nest: true,
                include: [
                    { model: Model.CategoryModel, as: 'category' },
                    { model: Model.QuantityModel, as: 'quantity' },
                    { model: Model.ImageModel, as: 'image' },
                ],
            });

            response.render('ecommerce_product_detail', {
                products: [product],
            });
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/product_detail', async (request, response, next) => {
        try {
            const products = await Model.ProductModel.findAll({
                raw: true,
                nest: true,
                include: [
                    { model: Model.CategoryModel, as: 'category' },
                    { model: Model.QuantityModel, as: 'quantity' },
                    { model: Model.ImageModel, as: 'image' },
                ],
            });

            response.render('ecommerce_products_detail', { products });
        } catch (error) {
            console.log(error);
            response.send('Error');
        }
    })
    .get('/orders', function (request, response) {
        response.render('ecommerce-orders');
    })
    .get('/500', function (request, response) {
        response.sendFile(path.join(__dirname, '../views/500.html'));
    })
    .get('/404', function (request, response) {
        response.sendFile(path.join(__dirname, '../views/404.html'));
    })
    .get('/register', function (request, response) {
        response.sendFile(path.join(__dirname, '../views/register.html'));
    })
    .get('/forgot_password', function (request, response) {
        response.sendFile(
            path.join(__dirname, '../views/forgot_password.html')
        );
    })
    .get('/login', function (request, response) {
        response.sendFile(path.join(__dirname, '../views/login.html'));
    });

module.exports = router;
