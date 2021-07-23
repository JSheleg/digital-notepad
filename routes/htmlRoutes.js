const path = require('path');
const router = require('express').Router();

//add route to index.html and respond with HTML page displayed in browser
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

//add route to index.html and respond with HTML page displayed in browser
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
  

module.exports = router;