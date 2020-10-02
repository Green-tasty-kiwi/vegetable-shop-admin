const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' });
