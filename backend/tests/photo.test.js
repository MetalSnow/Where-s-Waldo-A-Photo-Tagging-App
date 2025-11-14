const { app, request } = require('./setup');

test('photo route works', (done) => {
  request(app)
    .get('/photos')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      const photos = res.body.photos;
      expect(Array.isArray(photos)).toBe(true);
      expect(photos.length).toBeGreaterThan(0);
      expect(photos[0]).toHaveProperty('name');
      expect(photos[0]).toHaveProperty('fileUrl');
    })
    .expect(200, done);
});
