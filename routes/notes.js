const notes = require("express").Router();
const noteList = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, readAndDelete } = require('../helpers/fsUtils');

// grab all the data from the db.json file
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

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
        

notes.post('/', (req,res) => {
    console.log(req.body);

    const{ title, text } = req.body;

    if(req.body) {
        const newNote = {
            title, 
            text, 
            id: uuidv4()
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding the notes')
    }

    
});

notes.delete('/:id', (req, res) => {
    if(req.params.id) {
        console.info(`${req.method} request received to remove a note`)
        const noteId = req.params.id;
        for(let i = 0; i < noteList.length; i++) {
            const currentId = noteList[i];
            if(currentId.id === noteId) {
                readAndDelete(currentId.id, './db/db.json')
                res.json(`Note removed successfully 🚀`)
            }
        }
    } else {
        res.status(400).send('Note ID not provided');
    }
});

module.exports = notes;