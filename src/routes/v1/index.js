const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
 return res.json({ message: 'API v1 is working!' });
});

module.exports = router;