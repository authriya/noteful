import React from 'react'

export default function NotePageNav(props) {
    return (
        <div>
        {props.folder && (
          <h3 className='NotePageNav__folder-name'>
            {props.folder.name}
          </h3>
        )}
      </div>
    )
  }
  
  NotePageNav.defaultProps = {
    history: {
      goBack: () => {}
    }
  }