const express = require('express');
const Models = require('../database/index');

const categories = [
    'vegetables',
    'fruits',
    'drinks',
    'groceries',
    'berries',
    'dairy products',
    'sweets',
    'baked goods',
    'frozen foods',
    'fish',
    'meat',
];

(async function createCategory() {
    await Models.sequelize.authenticate();
    Models.sequelize.sync();
    try {
        const promisses = categories.map((category) => {
            return Models.CategoryModel.create({
                name: category,
            });
        });

        await Promise.all(promisses);
    } catch (error) {
        console.error(error);
    }
})();
