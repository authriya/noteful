import React from 'react'
import CircleButton from './CircleButton'
import './NotePageNav.css'
import ApiContext from './ApiContext'
import {findNote, findFolder} from './NoteHelper'

export default class NotePageNav extends React.Component {
  static contextType = ApiContext;
  render() {
    const {notes, folders} = this.context
    const {noteId} = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
        <div className="NotePageNav">
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
          >
          <br />
          Back
        </CircleButton>
          {folder && (
            <h3 className='NotePageNav__folder-name'>
              {folder.name}
            </h3>
          )}
      </div>
    )
  }
}
  
  NotePageNav.defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  }
