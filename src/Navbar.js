import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { countNotesForFolder } from './NoteHelper'
import CircleButton from './CircleButton'
import './Navbar.css'
import ApiContext from './ApiContext'

class Navbar extends React.Component {
  static contextType = ApiContext;
    render() {
      const { folders=[], notes=[] } = this.context
      return(
      <div className='Navbar'>
        <ul className='Nav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                {folder.name} {' '}
                <span className='Nav__num-notes'>
                  ({countNotesForFolder(notes, folder.id)})
                </span>
              </NavLink>
            </li>
          )}
        </ul>
        <div className='Nav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <br />
            Add Folder
          </CircleButton>
        </div>
      </div>
  )
}}

export default Navbar