import React from 'react'
import Note from './Note'
import CircleButton from './CircleButton'
import './Notes.css'
import {Link} from 'react-router-dom'

class Notes extends React.Component{
    render() {
        return (
            <section className="noteslist">
                <ul>
                    {this.props.notes.map(note =>
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            />
                        </li>
                    )}
                </ul>
        <div className='NoteListMain__button-container'>
            <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
            >
            <br />
            Add Note
            <br />
            </CircleButton>
      </div>
            </section>
        )
    }
}

export default Notes