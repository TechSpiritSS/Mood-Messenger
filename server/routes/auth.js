const { getAllUsers, logOut } = require('../controllers/userController');

const router = require('express').Router();

// router.post("/register", register);
router.get('/allusers/:id', getAllUsers);
router.get('/logout/:id', logOut);

module.exports = router;
