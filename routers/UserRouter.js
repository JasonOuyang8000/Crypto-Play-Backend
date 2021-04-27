const userRouter = require('express').Router();

const { create } = require('../controllers/UserController');

userRouter.post('', create);



module.exports = userRouter;
