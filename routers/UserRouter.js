const userRouter = require('express').Router();

const { create, login } = require('../controllers/UserController');

userRouter.post('', create);

userRouter.post('/login', login);



module.exports = userRouter;
