import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import axios from 'axios'
import "./style.css"

export default function App() {
   
    const [notes, setNotes] = React.useState([])
    

       
        React.useEffect(()=>{ 
            axios.get('https://notes-self-six.vercel.app/notes')
            .then((response)=>{
                setNotes(response.data)
            })
            .catch((error)=>{
                console.log(error);
         })
       
        },[notes])
      
        const [currentNoteId, setCurrentNoteId] = React.useState(
            (notes[0]?._id) || ""
        )
    
    const currentNote = notes.find(note => note._id === currentNoteId) || notes[0]
    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?._id)
        }
    }, [notes])

    function createNewNote() {
       
        const newNote={
            content: JSON.stringify("# Type your markdown note's title here")
        }
        axios.post('https://notes-self-six.vercel.app/notes/',newNote)
        .then((response) => {
            console.log(response.data);
            setCurrentNoteId(response.data._id)
            
          })
          .catch((error)=>{
            console.log(error);
        })
        
    }

    function updateNote(text) {
        console.log(text.content)
        const url=`https://notes-self-six.vercel.app/notes/${currentNoteId}`
        const newNote = {
            content: text
        }
        console.log(url)
        axios.put(url,newNote)
        .then((response) => {
            console.log(response.data);
          })
          .catch((error)=>{
           
            console.log(error);
        })
      
    }

    function deleteNote(event,noteId) {
    
        const url=`https://notes-self-six.vercel.app/notes/${noteId}`
        
        axios.delete(url)
        .then((response) => {
            console.log(response);
          })
          .catch((error)=>{
            console.log('delete')
            console.log(error);
        })
       
      
    }
         
    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={notes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        {
                            currentNoteId &&
                            notes.length > 0 &&
                            <Editor
                                currentNote={currentNote}
                                updateNote={updateNote}
                            />
                        }
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                    </div>
              
            }
        </main>
    )
}
