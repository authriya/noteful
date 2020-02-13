import React from 'react';
import Navbar from './Navbar';
import Notes from './Notes';
import NotePageNav from './NotePageNav'
import NotePageMain from './NotePageMain'
import AddFolder from './AddFolder'
import AddNote from './AddNote'
import './App.css'
import { Route, Link } from 'react-router-dom';
import ApiContext from './ApiContext'

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    this.updateState()
  }

  updateState = () => {
    Promise.all([
      fetch(` https://quiet-waters-80091.herokuapp.com/api/notes`),
      fetch(` https://quiet-waters-80091.herokuapp.com/api/folders`)
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
      notes: this.state.notes.filter(note=> note.id != noteId)
    })
    console.log(this.state.notes)
  }

  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  addFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder],
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
        <Route path= "/add-folder" component={Navbar}/>
        <Route path="/add-note" component={Navbar} />
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
        <Route
        path = '/add-folder'
        component = {AddFolder}
        />
        <Route 
        path = '/add-note'
        component = {AddNote}
        />
      </>
    )
  }
  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addNote: this.addNote,
      addFolder: this.addFolder,
      updateState: this.updateState
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
