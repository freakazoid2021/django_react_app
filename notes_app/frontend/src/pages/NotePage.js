import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg'



const NotePage = ({match, history}) => {

    
    const {id: noteId} = useParams()
    
    const [note, setNote] = useState(null)
    console.log(noteId)

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
      if (noteId === 'new') return

      const response = await fetch(`/api/notes/${noteId}/`)
      const data = await response.json()
      setNote(data)
    }


    let createNote = async () => {
      fetch(`/api/notes/create/`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
      })
    }


    let updateNote = async () => {

      fetch(`/api/notes/${noteId}/update/`,{
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
        }
      )
    }

    let deleteNote = async () => {

      fetch(`/api/notes/${noteId}/delete/`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      history.push('/')
    }

    let handleSubmit = () => {
      console.log('NOTE: ', note)

      if (noteId !== 'new' && note.body == '') {
        deleteNote()
      }  else if (noteId !== 'new') {
        updateNote()
      } else if ( noteId === 'new' && note.body !== null) {
        createNote()
      }
      
      history.push('/')
    }

    let handleChange = (value) => {
      setNote(note => ({...note, 'body' : value}))
      console.log("handle change: ", note)
    }


  return ( 
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/" className="app-header button">
              <ArrowLeft onClick={handleSubmit} />
            </Link>
        </h3>
        
        { 
        noteId !== 'new' ? (
            <button onClick={deleteNote}>Delete</button>
          ) : (
            <button onClick={handleSubmit}>Done</button>
          )
        }
        
      </div>
      
      <textarea onChange={(e) => 
      {handleChange(e.target.value)}}
      value={note?.body}>
      </textarea>
    </div>
  )
}

export default NotePage