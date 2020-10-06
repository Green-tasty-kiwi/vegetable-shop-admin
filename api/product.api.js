const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Models = require('../database/index');

const productStorage = multer.diskStorage({
    destination: function (request, file, cb) {
        const dir = path.join(__dirname, `../uploads/`);
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, `product${path.extname(file.originalname)}`);
    },
});

router.post(
    '/',
    multer({ storage: productStorage }).single('product'),
    async (request, response, next) => {
        const body = request.body;
        const file = request.file.filename;
        try {
            const product = await Models.ProductModel.create({
                name: body.name,
                description: body.description,
                price: body.price,
                meta_tag: body.meta_tag,
                meta_description: body.meta_description,
                meta_keywords: body.meta_keywords,
            });
            const image = await Models.ImageModel.create({
                url: file,
            });
            const quantity = await Models.QuantityModel.create({
                kg: body.kg,
            });
            response.send(product, image, quantity);
        } catch (error) {
            console.error(error);
            response.send('error');
        }
    }
);
