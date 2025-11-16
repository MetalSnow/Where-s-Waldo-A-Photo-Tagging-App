const express = require('express');
const photoRouter = require('./routes/photoRouter');
const errorMiddleware = require('./middlewares/errorHandler');
const userRouter = require('./routes/userRouter');
const charRouter = require('./routes/charRouter');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));
~app.get('/', (req, res) => {
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
