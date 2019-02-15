const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const port = process.env.PORT || 8080;
const mongoUri = process.env.MONGO_URI;
const secret = process.env.SECRET;

const app = express();
app.use(bodyParser.json());

app.get('/api/users', async (req, res) => {
  res.json({ message: 'Sucesso' });
});

app.post('/api/users/auth', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username, password }).lean();

    if (user) {
      let token = await jwt.sign(user, secret);
      res.json({ token });
    } else {
      res.status(401).json({
        message: 'Username/password invalid.'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
})

mongoose.Promise = global.Promise;

app.listen(port, async () => {
  console.log(`user-service running on ${port}`);
  mongoose.connect(mongoUri);
  const db = mongoose.connection;

  await User.deleteMany();
  let seed = new User();
  seed.username = 'teste',
    seed.password = 123,

    await seed.save();

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
});