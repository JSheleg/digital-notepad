//load required modules
const router = require('express').Router();
const fs = require('fs');
const {v4:uuidv4} = require('uuid');

//get note taker screen (data pulled from db.json)
router.get("/notes", (req,res) => {
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
    res.json(data);
})

//add new note
router.post("/notes", (req, res) => {
    //save input from page into newNote
    const newNote = req.body;

    console.log(req.body);

    //assign id of newNote
    newNote.id = uuidv4()

    //pull data from file through read
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
    
    //push newNote into data
    data.push(newNote)

    //write data back to db.json file
    fs.writeFileSync("./db/db.json", JSON.stringify(data))
    res.json(data);
})

//delete note
router.delete("/notes/:id", (req,res) => {
    //pull in data from json file
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
    // console.log(req.params.id);

    //filter for all notes withouth the id clicked on
    const deleteNote = data.filter(note => note.id != req.params.id)
    
    //assign data without the deleted note back to data
    data = deleteNote;

    //write data back to db.json file
    fs.writeFileSync("./db/db.json", JSON.stringify(data))
    res.json(data);
})

module.exports = router;