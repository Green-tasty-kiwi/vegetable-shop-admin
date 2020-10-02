const express = require('express');
const router = express.Router();
const path = require('path');

router
    .get('/', function (request, response) {
        response.render('index');
    })
    .get('/profile', function (request, response) {
        response.render('profile');
    })
    .get('/products_grid', function (request, response) {
        response.render('ecommerce_products_grid');
    })
    .get('/product_list', function (request, response) {
        response.render('ecommerce_product_list');
    })
    .get('/product', function (request, response) {
        response.render('ecommerce_product');
    })
    .get('/product_detail', function (request, response) {
        response.render('ecommerce_product_detail');
    })
    .get('/orders', function (request, response) {
        response.render('ecommerce-orders');
    })
    .get('/cart', function (request, response) {
        response.render('ecommerce-cart');
    })
    .get('/payments', function (request, response) {
        response.render('ecommerce_payments');
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
