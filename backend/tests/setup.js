const photoRouter = require('../routes/photoRouter');

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/photos', photoRouter);

module.exports = { request, app };
