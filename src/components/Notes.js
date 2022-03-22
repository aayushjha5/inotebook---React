import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
    //using the UseContext hook
    const context = useContext(noteContext);
    //using destructuring method
    const { notes, addNote } = context;
    return (
        <>
        <AddNote/>
        <div className="row my-3">
            <h2>Your Notes</h2>
            {/* using destructuring method of js to obtain 'notes' from context */}
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note}/> 
            })}
        </div>
        </>
    )
}

export default Notes