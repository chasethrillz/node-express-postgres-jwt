// server.js
const express = require('express');
const dotenv = require('dotenv');

const ReflectionWithJsObject = require('./src/usingJSObject/controllers/Reflection');
const ReflectionWithDB = require('./src/usingDB/controller/Reflection');
const UserWithDb = require('./src/usingDB/controller/Users');
const Auth = require('./src/usingDB/middleware/Auth');

dotenv.config();
const Reflection =
  process.env.TYPE === 'db' ? ReflectionWithDB : ReflectionWithJsObject;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res
    .status(200)
    .send({ message: 'YAY! Congratulations! Your first endpoint is working' });
});

const PORT = process.env.PORT || 3000;

app.post('/api/v1/reflections', Auth.verifyToken, Reflection.create);
app.get('/api/v1/reflections', Auth.verifyToken, Reflection.getAll);
app.get('/api/v1/reflections/:id', Auth.verifyToken, Reflection.getOne);
app.put('/api/v1/reflections/:id', Auth.verifyToken, Reflection.update);
app.delete('/api/v1/reflections/:id', Auth.verifyToken, Reflection.delete);
app.post('/api/v1/users', UserWithDb.create);
app.post('/api/v1/users/login', UserWithDb.login);
app.delete('/api/v1/users/me', Auth.verifyToken, UserWithDb.delete);

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`App listening on port ${PORT}`);
});
