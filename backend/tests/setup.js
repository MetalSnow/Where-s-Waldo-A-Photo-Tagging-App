const photoRouter = require('../routes/photoRouter');

const request = require('supertest');
const express = require('express');
const charRouter = require('../routes/charRouter');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/photos', photoRouter);
app.use('/photos', charRouter);

module.exports = { request, app };
