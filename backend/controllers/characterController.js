const asyncHandler = require('express-async-handler');
const prisma = require('../database/prismaClient');

const getAllCharacters = asyncHandler(async (req, res) => {
  const photoId = Number(req.params.photoId);
  const characters = await prisma.character.findMany({
    where: {
      photoId: photoId,
    },
    orderBy: {
      id: 'asc',
    },
  });
  res.json({ characters: characters });
});

const getCharacter = asyncHandler(async (req, res) => {
  const photoId = Number(req.params.photoId);
  const characterId = Number(req.params.charId);

  const character = await prisma.character.findFirst({
    where: {
      id: characterId,
      photoId: photoId,
    },
  });

  res.json({ character: character });
});

const createCharacter = asyncHandler(async (req, res) => {
  const character = req.body;
  const photoId = Number(req.params.photoId);

  const data = await prisma.character.create({
    data: {
      name: character.name,
      xPosition: 24,
      yPosition: 24,
      photoId: photoId,
    },
  });

  res.json({ message: 'Character created!', character: data });
});

module.exports = { getAllCharacters, getCharacter, createCharacter };
