import React from 'react'
import Note from './Note'

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
            </section>
        )
    }
}

export default Notes