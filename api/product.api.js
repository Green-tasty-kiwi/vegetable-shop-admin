const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' });
const Models = require('../database/index');


router
.post('/', async (request, response, next){
    const body = request.body;
    try{
        const product = await Models.ProductModel.create({
            name: body.name,
            description: body.description,
            price:body.price,
            meta_tag: body.meta_tag,
            meta_description: body.meta_description,
            meta_keywords: body.meta_keywords,
        });
        const image = await Models.ImageModel.create({
            url: body.url,
        });
        const category = await Models.CategoryModel.create({
            
        })
    }catch(error){
        console.error(error);
        response.send('error');
    }
})