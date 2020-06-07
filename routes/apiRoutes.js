const fs = require('fs');
const path = require("path");

module.exports = function (app) {

    //view all notes as json on browser
    app.get("/api/notes", function (req, res) {

        //read json file
        fs.readFile(path.join(__dirname, "/../db/db.json"), "utf-8", (err, notes) => {
            if (err) throw err;
            // console.log("notes");
            //display notes in json format
            res.json(notes);

        });

    });


    //post new note and generate new id for it
    app.post("/api/notes", function (req, res) {
        const note = req.body;
        //read file with existing notes
        fs.readFile(path.join(__dirname, "/../db/db.json"), "utf-8", (err, notes) => {
            if (err) throw err;

            let notesArray = [];

            //if notes found, parse and store in array
            if (notes) {
                notesArray = JSON.parse(notes);
            }
            //give note an id
            note.id = notesArray.length + 1;

            //push into array
            notesArray.push(note);

            //write to file
            fs.writeFile(path.join(__dirname, "/../db/db.json"), JSON.stringify(notesArray), (err) => {
                if (err) throw err;
                Console.log("Note posted");
            })
        });
        res.send(note);

    });

};