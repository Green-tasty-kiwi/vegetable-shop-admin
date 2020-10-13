const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Models = require('../database/index');
const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

const productStorage = multer.diskStorage({
    destination: function (request, file, cb) {
        const dir = path.join(__dirname, `../uploads/`);
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, `product.${path.basename(file.originalname)}`);
    },
});

module.exports = router
    .post(
        '/create',
        multer({ storage: productStorage }).single('product'),
        async (request, response, next) => {
            const body = request.body;
            const file = request.file.filename;
            try {
                const category = await Models.CategoryModel.findByPk(
                    body.categoryId
                );

                const product = await Models.ProductModel.create({
                    name: body.name,
                    description: body.description,
                    price: body.price,
                    meta_tag: body.meta_tag,
                    meta_description: body.meta_description,
                    meta_keywords: body.meta_keywords,
                    category_id: category.id,
                });

                const image = await Models.ImageModel.create({
                    url: file,
                    product_id: product.id,
                });

                const quantity = await Models.QuantityModel.create({
                    kg: body.kg,
                    product_id: product.id,
                });

                response.send([product, image, quantity]);
            } catch (error) {
                console.error(error);
                response.send('error');
            }
        }
    )
    .post(
        '/:productId',
        multer({ storage: productStorage }).single('product'),
        async (request, response, next) => {
            const body = request.body;
            const productId = request.params.productId;
            try {
                const product = await Models.ProductModel.findOne({
                    where: {
                        id: productId,
                    },
                });
                const updateProduct = await product.update({
                    name: body.name,
                    description: body.description,
                    price: body.price,
                    meta_tag: body.meta_tag,
                    meta_description: body.meta_description,
                    meta_keywords: body.meta_keywords,
                    status: body.status,
                });
                const quantity = await Models.QuantityModel.findOne({
                    where: {
                        product_id: productId,
                    },
                });
                const updateQuantity = await quantity.update({
                    kg: body.kg,
                });
                response.redirect(`/products/${updateProduct.id}`);
            } catch (error) {
                console.error(error);
                response.send('error');
            }
        }
    )
    .post(
        '/:productId/image',
        multer({ storage: productStorage }).single('product'),
        async (request, response, next) => {
            const productId = request.params.productId;
            try {
                const file = request.file.filename;
                const image = await Models.ImageModel.findOne({
                    where: {
                        product_id: productId,
                    },
                });
                const imageName = image.url;
                try {
                    await unlinkAsync(
                        path.join(__dirname, `../uploads/${imageName}`)
                    );
                } catch (error) {
                    if (error.code !== 'ENOENT') {
                        throw error;
                    }
                }
                const updateImage = await image.update({
                    url: file,
                });

                response.redirect(`/products/${productId}`);
            } catch (error) {
                console.error(error);
                response.send('error');
            }
        }
    )
    .get('/images/:imageName', function (request, response, next) {
        const fileName = request.params.imageName;

        response.sendFile(path.join(__dirname, `../uploads/${fileName}`));
    });
