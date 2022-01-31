// routes folder containing all the routes and server request tha will me made

const notes = require("express").Router();
const noteList = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, readAndDelete } = require('../helpers/fsUtils');

// grab all the data from the db.json file
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// get request when a user tries to view a already created note
notes.get('/:id', (req, res) => {
    if(req.params.id) {
        console.info(`${req.method} request received to get a single note`)
        const noteId = req.params.id;
        for(let i = 0; i < noteList.length; i++) {
            const currentId = noteList[i];
            if(currentId.id === noteId) {
                res.status(200).json(currentId);
                return;
            }
        }
        res.send('Note not found');
    } else {
        res.status(400).send('Note ID not provided');
    }
});
        
// post request to upload new notes to db.json to store
notes.post('/', (req,res) => {
    console.log(req.body);

    const{ title, text } = req.body;

    if(req.body) {
        const newNote = {
            title, 
            text, 
            id: uuidv4()
        };

        readAndAppend(newNote, 'db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding the notes')
    }

    
});

// delete request allowing users to specifically delete notes of their choice
notes.delete('/:id', (req, res) => {
    const notes = require('../db/db.json');
    if(req.params.id) {
        console.info(`${req.method} request received to remove a note`)
        const noteId = req.params.id;
        console.log("matching id");
        readAndDelete(noteId, 'db/db.json')
        res.json(`Note removed successfully 🚀`)
    } else {
        res.status(400).send('Note ID not provided');
    }
});

// exports the requests to be utilized in other files
module.exports = notes;