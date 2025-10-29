const { Router } = require('express');

const charRouter = new Router();

charRouter.get('/:photoId', getCharacters);

module.exports = charRouter;
