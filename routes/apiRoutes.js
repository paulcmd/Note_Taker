const fs = require('fs');
const path = require("path");
//const uuid = require("uuid/v4");

module.exports = function (app) {

    let notesArray = [];

    //  view all notes as json on browser
    app.get("/api/notes", function (req, res) {

        //read json file
        fs.readFile(path.join(__dirname, "/../db/db.json"), "utf-8", (err, notesData) => {
            if (err) throw err;
            console.log(notesData);
            //display notes in json format
            res.json(notesData);

        });

    });


    // post new note to API route (and generate unique ID for note)

    app.post("/api/notes", (req, res) => {
        // read the file with all of the existing notes
        fs.readFile(path.join(__dirname, "/../db/db.json"), "utf-8", (err, notesData) => {
            if (err) throw err;

            if (notesData) {
                notesArray = JSON.parse(notesData)
            }

            //save note id
          let  noteId = notesArray.length + 1;

            // add new note to notes array with a generated ID
            notesArray.push({
                id: noteId,
                title: req.body.title,
                text: req.body.text
            });

            // write new note to the json file
            fs.writeFileSync(path.join(__dirname, "/../db/db.json"), JSON.stringify(notesArray), (err) => {
                if (err) throw err;
                res.sendStatus(200);
            })

        });

    });


// go to notes id
    app.delete("/api/notes:id", function (req, res) {

        //save note's id
        const noteId = parseInt(req.params.id);

        //read file with existing notes
        fs.readFile(path.join(__dirname, "/../db/db.json"), "utf-8", (err, notes) => {
            if (err) throw err;

            let notesArray = [];

            //if notes found, parse and store in array
            if (notes) {
                notesArray = JSON.parse(notes);
            }
            //remove note from db
            notesArray = notesArray.filter(element => element.id !== noteId);

            //write to file
            fs.writeFile(path.join(__dirname, "/../db/db.json"), JSON.stringify(notesArray), (err) => {
                if (err) throw err;
                res.sendStatus(200);
            })
        });

    });

}
