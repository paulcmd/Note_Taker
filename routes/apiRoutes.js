const fs = require('fs');
const path = require("path");


module.exports = function (app) {

    let notesArray = [];

    //  view all notes as json on browser
    app.get("/api/notes", (req, res) => {

        //read json file
        notesArray = JSON.parse(fs.readFileSync("./db/db.json"));
        console.log( notesArray);
        //display notes in json format
        res.json(notesArray);

    });


// post new note to API route (and generate unique ID for note)

    app.post("/api/notes", (req, res) => {
        // read the file with all of the existing notes
        notesArray = JSON.parse(fs.readFileSync("./db/db.json"));

        //save note id
        let noteId = notesArray.length + 1;
        // notesArray.push(notesData);

        // add new note to notes array with a generated ID
        notesArray.push({
            id: noteId,
            title: req.body.title,
            text: req.body.text
        });

        // write new note to the json file
        fs.writeFileSync("./db/db.json", JSON.stringify(notesArray));
        res.json(true);

    });


// go to notes id
    app.delete("/api/notes:id", (req, res) =>{

        //save note's id


        //read file with existing notes
        notesArray = JSON.parse(fs.readFileSync("./db/db.json"));
        //const noteId = parseInt(req.params.id);


        //remove note from db
         notesArray = notesArray.filter(element => {
             return element.id !== req.params.id
         });
        //console.log("This is the chosen note id : " + req.params.id);

        //write to file
        fs.writeFileSync("./db/db.json", JSON.stringify(notesArray));
        res.json(true);
    });

}
