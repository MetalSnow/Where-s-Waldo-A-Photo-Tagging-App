const { Router } = require('express');
const { getAllPhotos, getPhoto } = require('../controllers/photoController');

const photoRouter = new Router();

photoRouter.get('/', getAllPhotos);
photoRouter.get('/:id', getPhoto);

module.exports = photoRouter;
