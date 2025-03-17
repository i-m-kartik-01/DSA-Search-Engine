const express = require('express');
const path = require('path');
const fileLoader = require('./utils/fileLoader');
const TFIDF = require('./utils/tfidf');

const app = express();
const port = 3000;

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// Load documents and initialize TF-IDF
const documents = fileLoader.loadDocuments(path.join(__dirname, 'data'));
const tfidf = new TFIDF(documents);

// Routes
app.get('/', (req, res) => res.render('index'));

app.get('/search', (req, res) => {
    const query = req.query.query;
    const results = tfidf.search(query);
    res.render('results', { 
        query: query,
        results: results 
    });
});

app.listen(port, () => {
    console.log(`Search engine running at http://localhost:${port}`);
});