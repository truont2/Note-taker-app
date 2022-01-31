const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

// function used to update a specified file with the content that is run through
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
  
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */

// function reads a specified file and updates its content
// adds on the new note we created to the array
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// fucntion reads and updates the file contents by removing the id we pass though
// takes in the id of the note we want to remove
// the array is filtered for that element with the specified id and the function updates the file to contain notes other than the one we passed through
const readAndDelete = (content, file) => {
  fs.readFile(file, 'utf-8', (error, data) => {
    if(error){
      console.error(error);
    } else {
      const parsedData = JSON.parse(data);
      const newData = parsedData.filter((note) => {
        return note.id !== content;
      })
      writeToFile(file, newData);
      console.info(`\nData removed sucessfully`);
      }
      
  })
}

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };
