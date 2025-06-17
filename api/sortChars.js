const express = require('express');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {
  const { data } = req.body;

  if (!data || typeof data !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const sorted = data.split('').sort();
  return res.status(200).json({ word: sorted });
});

module.exports = app;
