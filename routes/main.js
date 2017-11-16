const router = require('express').Router();

// home url
router.get('/', (req, res) => {
    res.render('main/home');
});

// About page
router.get('/about', (req, res) => {
    res.render('main/about');
});

module.exports = router;