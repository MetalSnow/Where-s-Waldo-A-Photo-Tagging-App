const asyncHandler = require('express-async-handler');
const prisma = require('../database/prismaClient');

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ users: users });
});

const getUserInfo = asyncHandler(async (req, res) => {
  const userId = Number(req.params.userId);

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  res.json({ user: user });
});

const createUser = asyncHandler(async (req, res) => {
  const user = req.body;

  const data = await prisma.user.create({
    data: {
      username: user.username,
      beachScore: 0,
      skiingScore: 0,
      spaceScore: 0,
    },
  });

  res.json({ message: 'User created!', user: data });
});

const updateUserScore = asyncHandler(async (req, res) => {
  const userId = Number(req.params.userId);
  const scoreName = req.body.scoreName;
  const score = Number(req.body.score);

  const data = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username: req.body.username,
      [scoreName]: score,
    },
  });

  res.json({ message: 'User score updated!', user: data });
});

const updateUserName = asyncHandler(async (req, res) => {
  const username = req.body.username;
  const userId = Number(req.params.userId);

  const data = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username: username,
    },
  });

  res.json({ message: 'User name updated!', user: data });
});

module.exports = {
  getAllUsers,
  getUserInfo,
  createUser,
  updateUserScore,
  updateUserName,
};
