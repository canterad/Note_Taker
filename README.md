# Note Taker

Node Taker Project for UNH Boot Camp # 11 Express.js assignment.<br>
This repository was created for the Homework Assignment dealing with Express.js.<br><br>

Developer: Duane Cantera<br>
Date: Dec. 2, 2021<br>
Assignment: #11 - Express - Note Taker<br><br>

This application is used to write and save notes.  The application will use an Express.js back
end and will save and retrieve note data from a JSON file.  The back end of the application will
include a "db.json" file that will be used to store and retrieve notes using the "fs" module.
<br><br>
### The Following HTML Routes Are Called:<br>
"GET /notes" - Returns the "notes.html" file.<br><br>
"GET *" - Returns the "index.html" file.<br><br>
"GET /api/notes" - Reads the "db.json" file and returns all saved notes as JSON.<br><br>
"POST /api/notes" - Receives a new note to save on the request body. Adds it to the "db.json" file,<br>
                    and then returns the new note to the client.<br><br>

### Bonus:<br>
"DELETE /api/notes/:id" - Receives the query parameter that contains the id of a note to delete.<br><br>

### Operations Performed:<br><br>

#### "GET *" - Returns the "index.html" file.<br><br>
<img src="images/FirstScreen.jpg" height="400">

<br><br>
#### "GET /notes" - Returns the "notes.html" file.<br><br>
<img src="images/GetStarted.jpg" height="400">

<br><br>
#### Note Typed In:<br><br>
<img src="images/NoteTypedIn.jpg" height="400">

<br><br>
#### "POST /api/notes" - Note Added:<br><br>
<img src="images/NoteAdded.jpg" height="400">

<br><br>
#### "DELETE /api/notes/:id" - Note Deleted:<br><br>
<img src="images/NoteDeleted.jpg" height="400">

<br><br>
### Terminal Messages Displayed:<br><br>
<img src="images/TerminalText.jpg" height="400">

<br><br>
### LINKS:

Git Hub Link To Code For Project:<br> 
https://github.com/canterad/Note_Taker.git

Link to deployed application on Heroku:<br>
https://limitless-sea-65100.herokuapp.com/


