import React from 'react'
import Note from './Note'

class Notes extends React.Component{
    render() {
        return (
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
        )
    }
}

export default Notes