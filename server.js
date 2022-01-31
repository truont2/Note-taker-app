const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
const api = require('./routes/index');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// create a static folder to look for route folders
app.use(express.static('public'));

// get toute for the notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html')) 
);

// get request for the home page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => 
    console.log(`APP listening at http://localhost:${PORT} 🚀`)
);
