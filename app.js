const express = require('express');
const app = express();
const userRouter = require('./routes/users');
const itemRouter = require('./routes/items');
require('dotenv').config();

app.use(express.json());
app.use('/users', userRouter);
app.use('/items', itemRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000 (hardcoded)');
});