const express = require('express');
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db');
//sample data

//PORT
const PORT = process.env.PORT || 3001;

const app = express()
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

// parse incoming string or array data
//need line 16 and 18 everytime POST is used
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// //file path to location and instruct the server to make these files static resourses
// //all front end code can be access via public folder
// app.use(express.static('public'));

// //use router set up in apiRoutes, / endpont will connect to HTML routes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({db:notesArray},null,2)
    );
    return note;

}


app.get('/api/db', (req,res) => {
    res.json(notes);
});

app.post('/api/db', (req, res) => {
  //set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  //add note to json file
  const note = createNewNote(req.body, notes)

    res.json(note);
});


//set up server
app.listen(3001, () => {
    console.log(`API server now on port ${PORT}`);
});