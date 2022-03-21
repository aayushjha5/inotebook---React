import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=>{

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
      "description": "Greed has poisoned men’s souls, has barricaded the world with hate, has goose-stepped us into misery and bloodshed. We have developed speed, but we have shut ourselves in. Machinery that gives abundance has left us in want. Our knowledge has made us cynical. Our cleverness, hard and unkind. We think too much and feel too little. More than machinery we need humanity. More than cleverness we need kindness and gentleness. Without these qualities, life will be violent and all will be lost…",
      "tag": "quotes",
      "Date": "2022-03-21T14:57:42.679Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial)
    return (
        //using Provider, passing state  to all the components
        //The Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider. Here, the NoteContext provider contains all the children components, which means that we have to just wrap the application(app.js) inside <NoteState></NoteState>, in order to use the above-created state in every Component and Subcomponents.
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;