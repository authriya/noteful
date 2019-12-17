import React from 'react';
import Navbar from './Navbar';
import Notes from './Notes';
import NotePageNav from './NotePageNav'
import NotePageMain from './NotePageMain'
import { Route, Link } from 'react-router-dom';
import {getNotesForFolder, findNote, findFolder} from './NoteHelper';

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    setTimeout(() => this.setState(this.props.store), 600)
  }

  renderNavRoutes() {
    const {notes, folders} = this.state;
    return(
      <>
        {['/', 'folder/:folderId'].map(path => (
          <Route
            exact
            key = {path}
            path = {path}
            render = {routeProps => (
              <Navbar
                folders = {folders}
                notes = {notes}
                {...routeProps}
              />
            )}
          />
        ))}
        <Route
            path = "/note/:noteId"
            render = {routeProps => {
              const {noteId} = routeProps.match.params;
              const note = findNote(notes, noteId) || {};
              const folder = findFolder(folders, note.folderId);
              return <NotePageNav {...routeProps} folder={folder}/>
            }}
        />
        <Route path= "/add-folder" component={NotePageNav}/>
        <Route path="/add-note" component={NotePageNav} />
      </>
    )
  }

  renderMainRoutes() {
    const {notes, folders} = this.state;
    return(
      <>
        {['/','/folder/:folderId'].map(path => (
          <Route
            exact
            key = {path}
            path = {path}
            render = {routeProps => {
              const {folderId} = routeProps.match.params;
              const notesForFolder = getNotesForFolder(
                notes,
                folderId
              );
              return(
                <Notes
                  {...routeProps}
                  notes = {notesForFolder}
                />
              )
            }}
          />
        ))}
        <Route 
          path="/note/:noteId"
          render={routeProps => {
            const {noteId} =routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note}/>
          }}
        />
      </>
    )
  }
  render() {
    return (
      <div className="App">
        <nav className="navbar">{this.renderNavRoutes()}</nav>
        <header>
          <Link to="/"><h1>Noteful</h1></Link>{' '}
        </header>
        <main>
          {this.renderMainRoutes()}
        </main>
      </div>
      );
  }
}

export default App;
