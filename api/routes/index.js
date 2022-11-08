var express = require('express');
var router = express.Router();
const  userController  = require('../controller/userController');

/* GET home page. */
router.post('/register', userController.handleNewUser);
router.post('/login', userController.handleLogin);

module.exports = router;
