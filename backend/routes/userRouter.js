const { Router } = require('express');

const userRouter = new Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserInfo);
userRouter.post('/', createUser);

module.exports = userRouter;
