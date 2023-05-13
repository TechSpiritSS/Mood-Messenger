const router = require('express').Router();
const Middleware = require('../middleware');

router.post('/', Middleware.decodeToken, (req, res) => {
  Middleware.sendUserData(req, res, (userData) => {
    res.json({ userData });
  });
});

module.exports = router;
