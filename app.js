const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const blogRoutes = require('./routes/blogRoutes');
const app = express();


/**
 *  Set up application
 */
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}));


// allow cross-origin resource sharing
app.use(cors());


app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});


/**
 *  Connect to MongoDB cluster
 */

// normally the .env file shouldn't be included in the repo but I added it for the sake of an example
mongoose.connect(
    'mongodb+srv://blog_admin:blogger_personal_admin@myowncluster.y7orl.mongodb.net/blogWebsiteDB?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => app.listen(3000, 'localhost', () => console.log('Listening on port 3000\nConnected to DB')))
    .catch(err => console.log(err));


/**
 *  Routes
 */

//home page set to /all-blogs path
app.get('/', (req, res) => res.redirect('/blogs'));


// blog middleware
app.use('/blogs', blogRoutes);


// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});