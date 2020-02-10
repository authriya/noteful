import React from 'react'
import { Link } from 'react-router-dom'
import './Note.css'
import ApiContext from './ApiContext'
import PropTypes from 'prop-types'

class Note extends React.Component{
  static contextType= ApiContext;
  static defaultProps ={
    onDeleteNote: () => {}
  }

  handleClickDelete = e => {
    e.preventDefault()
    const noteId= this.props.id
    fetch(`http://localhost:8000/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(e=>Promise.reject(e))
      }
      return
    })
    .then(()=> {
      this.context.deleteNote(noteId)
      this.props.onDeleteNote()
    })
    .catch(error => {
      console.error({error})
    })
  }
    render() {
      const {name, id, modified} = this.props
      return(
        <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${id}`}>
              {name}
            </Link>
          </h2>
          <button className='Note__delete' type='button'
          onClick= {this.handleClickDelete}>
            remove 
          </button>
          <div className='Note__dates'>
            <div className='Note__dates-modified'>
              Modified {' '}
              <span className='Date'>
              {modified ? modified.slice(0, 10) : modified}
              </span>
            </div>
          </div>
        </div>
        )
    }
}

Note.propTypes = {
  onDeleteNote: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  modified: PropTypes.string.isRequired
}

export default Note