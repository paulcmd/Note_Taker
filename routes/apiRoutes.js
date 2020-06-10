const fs = require('fs');
const path = require("path");


module.exports = function (app) {

    let notesArray = [];

    //  view all notes as json on browser
    app.get("/api/notes", (req, res) => {

        //read json file
        notesArray = JSON.parse(fs.readFileSync("./db/db.json"));

        //display notes
        res.json(notesArray);

    });

// post new note to API route

    app.post("/api/notes", (req, res) => {
        // read the file with all of the existing notes
        notesArray = JSON.parse(fs.readFileSync("./db/db.json"));

        //save note id
        let noteId = notesArray.length + 1;

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


// // go to notes id
    app.delete("/api/notes/:id", (req, res) => {

        //read file with existing notes
        notesArray = JSON.parse(fs.readFileSync("./db/db.json"));

        //save note's id
        const noteId = req.params.id;


        //remove note from db
        notesArray.forEach((element, index) => {
            if (parseInt(element.id) === parseInt(noteId)) {
                //modify db from the beginning(index 0) and remove 1 item
                notesArray.splice(index, 1);
            }
        });

        //write to file
        fs.writeFileSync("./db/db.json", JSON.stringify(notesArray));
        res.json(true);
    });

}

