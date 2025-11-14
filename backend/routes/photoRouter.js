const { Router } = require('express');
const {
  getAllPhotos,
  getPhoto,
  createPhoto,
} = require('../controllers/photoController');

const photoRouter = new Router();

photoRouter.get('/', getAllPhotos);
photoRouter.get('/:id', getPhoto);
photoRouter.post('/', createPhoto);

module.exports = photoRouter;
