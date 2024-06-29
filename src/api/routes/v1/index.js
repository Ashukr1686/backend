const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => res.send({
  message: 'Server is up',
}));

module.exports = router;
