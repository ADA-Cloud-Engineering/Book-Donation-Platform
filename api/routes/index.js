const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const userController  = require('../controller/userController');
const bookController  = require('../controller/bookController');
const upload = require("../utils/multer");

/* GET home page. */
router.post('/register', userController.handleNewUser);
router.post('/login', userController.handleLogin);
router.post('/upload', verifyJWT, upload.single('file'), bookController.upload);

module.exports = router;

