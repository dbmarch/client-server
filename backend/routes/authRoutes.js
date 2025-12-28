
// https://dev.to/cerbos/authentication-and-authorization-in-nodejs-applications-12fk


const express = require('express');
const router = express.Router({mergeParams: true});
const {login, signup, authenticateToken} = require('../services/auth');

router.get("/protected", authenticateToken(["admin"]), (req, res) => {
  res.status(200).json({ message: `Welcome Admin ${req.user.username}!` });
});

router.post('/signup', (req, res) => {
  signup (req, res);
});


// Login route 
router.post('/login', (req, res) => {
  login(req, res);
})

module.exports = router