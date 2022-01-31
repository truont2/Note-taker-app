// file that combines all the notes routes into one call

const express = require("express");

// import modular routers
const notesRouter = require('./notes');

const app = express();
app.use('/notes', notesRouter);

module.exports = app;