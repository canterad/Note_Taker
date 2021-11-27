// Import the File System module and the json db file module.
const fs = require('fs');
const noteData = require('../db/db.json');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function AddNoteToFile - This function will add the Note object passed in to the db.json file.
// The res parameter is passed in so this function can send the response to the client.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddNoteToFile(newNote, res)
{
  // Obtain existing notes.
  fs.readFile('./db/db.json', 'utf8', (err, data) => 
  {
    // If an error occurred while reading the file console log it and return an error status and message.
    if (err) 
    {
      console.error(err);
      console.log(err);
      res.status(500).json('Update Note Operation Failed.');   
    } 
    // else - The readFile operation was successful.
    else 
    {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);
  
      // Add a new note.
      parsedNotes.push(newNote);
  
      // Write updated notes back to the file.
      fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) =>
      {
        // If the writeFile operation failed then console log it and return an error status and message.
        if (writeErr)
        {  
          console.error(writeErr);
          console.log(writeErr);
          res.status(500).json('Update Note Operation Failed.');          
        }
        // else - The writeFile operation was successful.
        else
        {
          // Console log that the update was successful.
          console.info('Successfully updated notes!');

          // Create object that contains the status and new Note added.
          const response = {
            status: 'success',
            body: newNote,
          };
      
          // Console log the response object.
          console.log(response);

          // Send the status and the response object to the client.
          res.status(201).json(response);  
        }
      });
    }
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: DeleteNoteFromFile - This function will remove the note that contains the id value passed in from
// the db.json file.  The "res" parameter is passed in so this function can send a response to the client.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeleteNoteFromFile(id, res)
{
  let nIndex = 0;
  let noteItems = [];
  let deletedNote = null;

  // Obtain existing notes.
  fs.readFile('./db/db.json', 'utf8', (err, data) => 
  {
    // If an error occurred while performing the readFile operation then console log it and
    // send the error status and message to the client.
    if (err) 
    {
      console.error(err);
      console.log(err);
      res.status(500).json('Delete Note Operation Failed.');   
    } 
    // else - The readFile operation was successful.
    else 
    {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);

      // Loop through all of the Note objects read from the file.
      for (nIndex = 0; nIndex < parsedNotes.length; nIndex++)
      {
        // If the id values don't match then add the note to the noteItems array.
        if (parsedNotes[nIndex].id !== id)
        {
          noteItems.push(parsedNotes[nIndex]);  
        }
        // else - id values match so save the note values.
        else
        {
          deletedNote = parsedNotes[nIndex];
        }
      }

      // Write updated notes back to the file.
      fs.writeFile('./db/db.json', JSON.stringify(noteItems, null, 4), (writeErr) =>
      {
        // If the writeFile operation failed then console log it and return error status and message.
        if (writeErr)
        {  
          console.error(writeErr);
          console.log(writeErr);
          res.status(500).json('Delete Note Operation Failed.');          
        }
        // else - Console log the success message.  Create response object that contains the deleted note.
        //        Console log the response object and send the status code and message to the client.
        else
        {
          console.info('Successfully Deleted note with id = ' + id.toString());

          const response = {
            status: 'deleted',
            body: deletedNote,
          };
     
          console.log(response);
          res.status(201).json(response);  
        }
      });
    }
  });
}

// Export all of the functions in the module.
module.exports = {
                   AddNoteToFile,
                   DeleteNoteFromFile
                 };