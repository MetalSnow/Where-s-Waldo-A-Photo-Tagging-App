const { Router } = require('express');
const {
  getAllUsers,
  getUserInfo,
  createUser,
  updateUserName,
  updateUserScore,
} = require('../controllers/userController');

const userRouter = new Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUserInfo);
userRouter.post('/', createUser);
userRouter.patch('/:userId/username', updateUserName);
userRouter.patch('/:userId/score', updateUserScore);

module.exports = userRouter;
