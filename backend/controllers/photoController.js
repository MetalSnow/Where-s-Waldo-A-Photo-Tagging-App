const getAllPhotos = (req, res) => {
  res.json({ photos: ['img1', 'img2', 'img3'] });
};
const getPhoto = (req, res) => {
  res.json({ photo: 'image' });
};

module.exports = { getAllPhotos, getPhoto };
