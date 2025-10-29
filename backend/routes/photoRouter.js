const { Router } = require('express');

const photoRouter = new Router();

photoRouter.get('/', getAllPhotos);
photoRouter.get('/:id', getPhoto);

module.exports = photoRouter;
