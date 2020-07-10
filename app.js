const express = require('express');
const app = express();

const path = require('path');

const blogRoutes = require('./routes/blog');


/**
 *  Set up application
 */
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware for external customStyles.css
app.use(express.static(path.join(__dirname, '/public')));


app.listen(3000, 'localhost', () => console.log('Listening on port 3000'));


/**
 *  Routes
 */

//home page set to /all-blogs path
app.get('/', (req, res) => res.redirect('/all-blogs'));


// blog middleware
app.use(blogRoutes);


// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});