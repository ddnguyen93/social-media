const router = require('express').Router();

const user_controller = require('../controllers/userController');
const auth_controller = require('../middleware/checkAuthentication');

router.get('/test', user_controller.test);

router.post('/user/create', user_controller.user_create);

router.post('/user/login', user_controller.user_login);

router.get(
	'/user/relogin',
	auth_controller.checkAuthentication,
	user_controller.user_relogin
);

module.exports = router;
