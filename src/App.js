import React from 'react';
import Navbar from './Navbar';
import Notes from './Notes';
import NotePageNav from './NotePageNav'
import NotePageMain from './NotePageMain'
import './App.css'
import { Route, Link } from 'react-router-dom';
import ApiContext from './ApiContext'

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/notes`),
      fetch(`http://localhost:9090/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if(!notesRes.ok)
        return notesRes.json().then(e=>Promise.reject(e));
        if(!foldersRes.ok)
        return foldersRes.json().then(e=>Promise.reject(e));
        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error=> {
        console.error({error});
      })
  }

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter(note=> note.id !== noteId)
    })
  }

  renderNavRoutes() {
    return(
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key = {path}
            path = {path}
            component = {Navbar}
          />
        ))}
        <Route
            path = "/note/:noteId"
            component = {NotePageNav}
        />
        <Route path= "/add-folder" component={NotePageNav}/>
        <Route path="/add-note" component={NotePageNav} />
      </>
    )
  }

  renderMainRoutes() {
    return(
      <>
        {['/','/folder/:folderId'].map(path => (
          <Route
            exact
            key = {path}
            path = {path}
            component = {Notes}
          />
        ))}
        <Route 
          path="/note/:noteId"
          component={NotePageMain}
        />
      </>
    )
  }
  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    }
    return (
      <ApiContext.Provider value = {value}>
        <div className="App">
          <nav className="navbar">{this.renderNavRoutes()}</nav>
          <header className="header">
            <Link to="/"><h1>Noteful</h1></Link>{' '}
          </header>
          <main>
            {this.renderMainRoutes()}
          </main>
        </div>
      </ApiContext.Provider>
      );
  }
}

export default App;
