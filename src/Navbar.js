import React from 'react'
import { NavLink} from 'react-router-dom'
import { countNotesForFolder } from './NoteHelper'

class Navbar extends React.Component {
    render() {
        return(
    <div className='Navbar'>
      <ul className='Nav__list'>
        {this.props.folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              {folder.name} {' '}
              <span className='NoteListNav__num-notes'>
                ({countNotesForFolder(this.props.notes, folder.id)})
              </span>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  )
}}

export default Navbar