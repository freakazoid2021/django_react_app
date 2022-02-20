import React, {useState, useEffect} from 'react'


const NotesListPages = () => {
    
    let [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async () => {
        // let response = await fetch('http://127.0.0.1:8000/api/notes/')
        // let data = await response.json()
        // console.log('DATA:', data)
        // setNotes(data)
        let response = await fetch('http://127.0.0.1:8000/api/notes/')
        let data = await response.json()
        
        setNotes(data)
    }
    
    return (
    <div>
         <div className="notes-list">
                {notes.map((note, index) => (
                    <h3>{note.body}</h3>
                ))}
         </div>
    </div>
  )
}

export default NotesListPages