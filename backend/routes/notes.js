const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//ROUTE 1:
//Get All the notes using GET "api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2:
//add notes using POST: /api/notes/addnote. LOGIN required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title ').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters ').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if there  are error , return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 3:
//update an existing node using PUT "/api/notes/updatenote" .LOGIN REQUIRED
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        //if incorrect user trying to access the note 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access Denied");
        }


        //note will be updated by below statement and if there is new one it will append a new one
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//ROUTE 4:
//delete an existing node using DELETE "/api/notes/delelenote" .LOGIN REQUIRED
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //find the note to be deleted and Delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //verify whether the user is authenticated to delete the particular note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access Denied");
        }


        //note will be updated by below statement and if there is new one it will append a new one
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted!", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})
module.exports = router