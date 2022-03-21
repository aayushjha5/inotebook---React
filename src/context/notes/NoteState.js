import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    //created a new state with name and class fields
    const s1 = {
        "name": "Harry",
        "class": "5b"
    }
    //applying useState method for updating the state s1
    const [state, setState] = useState(s1);
    //update function to update in name and class field after a certain interval.
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name": "Larry",
                "class": "10b"
            })
        }, 1000);
    }
    return (
        //using Provider, passing state s1 to all the components
        //The Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider. Here, the NoteContext provider contains all the children components, which means that we have to just wrap the application(app.js) inside <NoteState></NoteState>, in order to use the above-created state in every Component and Subcomponents.
        //also passing update function to the components
        <NoteContext.Provider value={{state:state, update:update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;