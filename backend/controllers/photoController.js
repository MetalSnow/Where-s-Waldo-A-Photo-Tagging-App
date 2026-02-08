const asyncHandler = require('express-async-handler');
const prisma = require('../database/prismaClient');

const getAllPhotos = asyncHandler(async (req, res) => {
  const allPhotos = await prisma.photo.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  res.json({ photos: allPhotos });
});

const getPhoto = asyncHandler(async (req, res) => {
  const photoId = Number(req.params.id);

  const photo = await prisma.photo.findFirst({
    where: {
      id: photoId,
    },
  });

  res.json({ photo: photo });
});

const createPhoto = asyncHandler(async (req, res) => {
  const photo = req.body;

  const data = await prisma.photo.create({
    data: {
      name: photo.name,
      fileUrl: photo.url,
    },
  });

  res.json({ message: 'Photo created!', photo: data });
});

module.exports = { getAllPhotos, getPhoto, createPhoto };
