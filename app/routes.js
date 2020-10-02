const express = require('express');
const router = express.Router();
const menuControllers = require('./controllers/menuControllers');

router.use(menuControllers);

module.exports = router;
