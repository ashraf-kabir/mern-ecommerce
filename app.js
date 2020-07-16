const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('hello from nodejs');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
