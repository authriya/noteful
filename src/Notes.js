import React from 'react'
import Note from './Note'
import CircleButton from './CircleButton'
import './Notes.css'
import {Link} from 'react-router-dom'
import ApiContext from './ApiContext'
import {getNotesForFolder} from './NoteHelper'
import PropTypes from 'prop-types'

class Notes extends React.Component{
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext
    render() {
        const {folderId} = this.props.match.params
        const { notes=[] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
        return (
            <section className="noteslist">
                <ul>
                    {notesForFolder.map(note =>
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

Notes.propTypes = {
    match: PropTypes.objectOf(PropTypes.string).isRequired
}

export default Notes