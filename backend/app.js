const express = require('express');
const photoRouter = require('./routes/photoRouter');
const errorMiddleware = require('./middlewares/errorHandler');
const userRouter = require('./routes/userRouter');
const charRouter = require('./routes/charRouter');
const cors = require('cors');
require('dotenv').config();

const app = express();

const cors = require('cors');

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (origin.includes('vercel.app') || origin === 'http://localhost:5173') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the game's server" });
});

app.use('/photos', photoRouter);
app.use('/users', userRouter);
app.use('/photos', charRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
