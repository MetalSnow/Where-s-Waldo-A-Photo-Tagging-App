const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('express-async-handler');

const databaseUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

const getAllPhotos = asyncHandler(async (req, res) => {
  const allPhotos = await prisma.photo.findMany();
  console.log(allPhotos);
  res.json({ photos: allPhotos });
});

const getPhoto = asyncHandler(async (req, res) => {
  const photoId = req.params.id;

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
