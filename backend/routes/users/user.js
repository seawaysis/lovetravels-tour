const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/users/user');

router.post('/login',userControllers.loginUser);
router.post('/register',userControllers.registerUser);

module.exports = router;