const { app, request } = require('./setup');

test('photo route works', (done) => {
  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect({ images: ['img1', 'img2', 'img3'] })
    .expect(200, done);
});
