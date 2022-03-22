import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {

  const notesInitial = [
    {
      "_id": "6236133eb7b44a2d4d26e225",
      "user": "6235d4f545e3e9ab44d80576",
      "title": "Exercise",
      "description": "Go to walk at 6 AM",
      "tag": "personal",
      "Date": "2022-03-19T17:30:38.438Z",
      "__v": 0
    },
    {
      "_id": "623892665af020e9828ba9e1",
      "user": "6235d4f545e3e9ab44d80576",
      "title": "The Great Dictator",
      "description": " More than machinery we need humanity.",
      "tag": "quotes",
      "Date": "2022-03-21T14:57:42.679Z",
      "__v": 0
    },
    {
      "_id": "6238ab22cf29807489490c48",
      "user": "6235d4f545e3e9ab44d80576",
      "title": "Margaret Mead",
      "description": "Always remember that you are absolutely unique. Just like everyone else.",
      "tag": "quotes",
      "Date": "2022-03-21T16:43:14.109Z",
      "__v": 0
    },
    {
      "_id": "6238ab4ecf29807489490c4a",
      "user": "6235d4f545e3e9ab44d80576",
      "title": "Benjamin Franklin",
      "description": "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
      "tag": "quotes",
      "Date": "2022-03-21T16:43:58.199Z",
      "__v": 0
    },
    {
      "_id": "6238ab73cf29807489490c4c",
      "user": "6235d4f545e3e9ab44d80576",
      "title": "Aristotle",
      "description": "It is during our darkest moments that we must focus to see the light.",
      "tag": "quotes",
      "Date": "2022-03-21T16:44:35.614Z",
      "__v": 0
    },
    {
      "_id": "6238ab92cf29807489490c4e",
      "user": "6235d4f545e3e9ab44d80576",
      "title": "Helen Keller",
      "description": "Life is either a daring adventure or nothing at all. ",
      "tag": "quotes",
      "Date": "2022-03-21T16:45:06.327Z",
      "__v": 0
    },
    {
      "_id": "6238abc7cf29807489490c51",
      "user": "6235d4f545e3e9ab44d80576",
      "title": "Thomas A. Edison",
      "description": "Many of life's failures are people who did not realize how close they were to success when they gave up. ",
      "tag": "quotes",
      "Date": "2022-03-21T16:45:59.744Z",
      "__v": 0
    },
    {
      "_id": "6238abf4cf29807489490c53",
      "user": "6235d4f545e3e9ab44d80576",
      "title": "Maya Angelou",
      "description": "You will face many defeats in life, but never let yourself be defeated.",
      "tag": "quotes",
      "Date": "2022-03-21T16:46:44.948Z",
      "__v": 0
    },
    {
      "_id": "6238ac0ccf29807489490c55",
      "user": "6235d4f545e3e9ab44d80576",
      "title": "Oscar Wilde",
      "description": "Life is never fair, and perhaps it is a good thing for most of us that it is not.",
      "tag": "quotes",
      "Date": "2022-03-21T16:47:08.214Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial)

  //add a note
  const addNote = (title, description, tag) => {
   //TODO: API CALL
    const note = {
      "_id": "6238ac0ccf29807489490c56",
      "user": "6235d4f545e3e9ab44d80576",
      "title": title,
      "description": description,
      "tag": tag,
      "Date": "2022-03-21T16:47:08.214Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  //delete a note
  const deleteNote = () => {

  }
  //update a note
  const updateNote = () => {

  }

  return (
    //using Provider, passing state  to all the components
    //The Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider. Here, the NoteContext provider contains all the children components, which means that we have to just wrap the application(app.js) inside <NoteState></NoteState>, in order to use the above-created state in every Component and Subcomponents.
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;