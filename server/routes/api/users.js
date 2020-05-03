const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Register 
router.post('/Register', async (req, res) => {
    bcrypt.hash(password, 10, (err, hash) => {
    })
})

// Login
router.post('/Login', async (req, res) => {
    const isCorrect = bcrypt.compareSync(passwordForm, passwordb);
});

module.exports = router;