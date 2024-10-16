const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve items. Try again in a few seconds.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, category, quantity, userId } = req.body;
    const item = await Item.create({ name, category, quantity, userId });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create item. Try again in a few seconds.' });
  }
});

module.exports = router;