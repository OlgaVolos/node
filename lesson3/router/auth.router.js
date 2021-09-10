const router = require('express').Router();

const {authController} = require('../controller')

router.post('/', authController.loginUser)


module.exports = router;
