// Import the express and path modules.
const express = require('express');
const path = require('path');

// Import the module I created that contains functions to add and delete notes.
const noteOperations = require('./helpers/note_operations');

// Import the file system module.
const fs = require('fs');

// Import Helper method for generating unique ids.
const uuid = require('./helpers/uuid');

// Create the express object and set the Port value.
const app = express();
const PORT = process.env.PORT || 3001;

// Set up the public directory so all files in this directory can be accessed and sent to the client.
app.use(express.static('public'));

// Set up Express to handle data parsing.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//////////////////////////////////////////////////////
// Handle GET request to return the notes.html file.
//////////////////////////////////////////////////////
app.get('/notes', (req, res) =>
{
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// Handle GET request to read the db.json file and return all saved notes as JSON.
/////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/notes', (req, res) =>
{
  // Sending all of the content of the db/db.json file.
  fs.readFile('./db/db.json', 'utf8', (err, data) =>
  {
    // If an error occurred while reading the file display in console and
    // return error status code and message. 
    if (err) 
    {
      console.error(err);
      console.log(err);
      res.status(500).json("Error reading note items in './db/db.json' file.");   
    } 
    // else - readFile operation was successful, display in console and return
    // the all the saved notes.
    else 
    {
      console.log("Successfully read note items in './db/db.json' file.");
      res.json(JSON.parse(data));
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Handle GET request to return the index.html file.
// '*' handles all calls.  Locate after all other get calls so all the other get request
// will be handled first.
///////////////////////////////////////////////////////////////////////////////////////////////
app.get('*', (req, res) =>
{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

/////////////////////////////////////////////////////////////////////////////////////
// Handle POST request to save new note received and add it to the db.json file.
// The function noteOperations.AddNoteToFile is called to perform this operation,
// passing in the new note object and the res parameter value.
/////////////////////////////////////////////////////////////////////////////////////
app.post('/api/notes', (req, res) =>
{
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note.`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present then create a new note object and add the unique
  // id value and call the noteOperations.AddNoteToFile to add the note to the db.json file.
  if ( title && text ) 
  {
    // Create variable for the object we will add.
    const newNote = 
    {
      title,
      text,
      id: uuid(),
    };

    // Call the function to add the note to the db.json file.
    noteOperations.AddNoteToFile(newNote, res);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Handle the DELETE request.  The id value for the note to delete is passed in as a parameter value.
// Retrieve the id parameter value.  Call the function noteOperations.DeleteNoteFromFile to remove
// the note from the db.json file.  Pass in the id value and the res parameter value.
///////////////////////////////////////////////////////////////////////////////////////////////////////
app.delete('/api/notes/:id', (req, res) =>
{
  // Retrieve the id parameter value and save in requestedID variable.
  const requestedID = req.params.id;

  // Log that a POST request was received.
  console.info(`${req.method} request received to delete a note.`);

  // Call the function noteOperations.DeleteNoteFromFile to remove the note from the db.json file.
  noteOperations.DeleteNoteFromFile(requestedID, res);
});

// Listen for connections
app.listen(PORT, () =>
  console.info(`Note Taker Application listening at http://localhost:${PORT} 🚀`)
);