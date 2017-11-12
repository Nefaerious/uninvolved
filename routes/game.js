var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('game/game.js');
});

module.exports = router;
