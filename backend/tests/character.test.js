const { app, request } = require('./setup');

test('character route works', (done) => {
  request(app)
    .get('/photos/1/characters')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      const characters = res.body.characters;
      expect(Array.isArray(characters)).toBe(true);
      expect(characters.length).toBeGreaterThan(0);
      expect(characters[0]).toHaveProperty('name');
      expect(characters[0]).toHaveProperty('xPosition');
    })
    .expect(200, done);
});
