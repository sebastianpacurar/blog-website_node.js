const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');


router.get('/', (req, res) => {

    Blog.find()
        .then(result => res.render('index', {title: 'All Blogs', allBlogs: result}))
        .catch(err => console.log(err));
});


router.get('/add', (req, res) => {
    res.render('addBlog', {title: 'Add a new BlogRoutes'})
})


router.post('/add', (req, res) => {

    console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
        .then(() => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;