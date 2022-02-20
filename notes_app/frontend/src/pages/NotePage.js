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
      const response = await fetch(`/api/notes/${noteId}/`)
      const data = await response.json()
      setNote(data)
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

      fetch(`/api/notes/${noteId}/datele`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      history.push('/')
    }

    let handleSubmit = () => {
      updateNote()
      history.push('/')
    }


  return ( 
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to='/'>
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        <button onClick={deleteNote}>Delete</button>
        
      </div>
      <p>
        {note?.body}
      </p>
      <textarea onChange={(e) => 
      {setNote({...note, 'body':e.target.value})}}
      defaultValue={note?.body}>
      </textarea>
    </div>
  )
}

export default NotePage