const router = require('express').Router();

const user_controller = require('../controllers/userController');

router.get('/test', user_controller.test);

router.post('/user/create', user_controller.user_create);

router.post('/user/login', user_controller.user_login);

module.exports = router;
