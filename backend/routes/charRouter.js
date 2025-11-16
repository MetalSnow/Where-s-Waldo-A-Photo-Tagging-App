const { Router } = require('express');
const {
  getAllCharacters,
  getCharacter,
  createCharacter,
} = require('../controllers/characterController');

const charRouter = new Router();

charRouter.get('/:photoId/characters', getAllCharacters);
charRouter.get('/:photoId/characters/:charId', getCharacter);
charRouter.post('/:photoId/characters', createCharacter);

module.exports = charRouter;
