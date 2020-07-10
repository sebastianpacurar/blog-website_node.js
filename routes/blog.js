const express = require('express');
const router = express.Router();


router.get('/all-blogs', (req, res) => {
    res.render('index', {title: 'All Blogs'});
});


module.exports = router;