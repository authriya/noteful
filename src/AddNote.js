import React from 'react'
import ValidationError from './ValidationError'
import ApiContext from './ApiContext'
import NotefulError from './NotefulError'
import './AddNote.css'

export default class AddNote extends React.Component {
    static contextType = ApiContext
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            modified: '',
            folderId: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            }
        };
    }

    updateName(name, modified) {
        this.updateModified(modified);
        this.setState({name: {value: name, touched: true}})
    }

    updateModified(modified) {
        this.setState({modified: modified})
    }

    updateContent(content, modified) {
        this.updateModified(modified);
        this.setState({content: {value: content, touched: true}})
    }

    updateFolderId = (folder) => {
        this.setState({folderId: {value: folder, touched: true}});
    }

    handleSubmit(event) {
        event.preventDefault();
        const note = {
            name: this.state.name.value,
            modified: this.state.modified, 
            content: this.state.content.value,
            folderId: this.state.folderId.value
        }
        console.log(note);
        const url = `http://localhost:9090/notes`
        console.log(url)
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(error=>{
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            this.setState({
                name: {value: ''},
                modified: '',
                folderId: {value: ''},
                content: {value: ''}
            })
            this.context.addNote(data)
            console.log(this.context)
            this.props.history.push('/')
        })
    }

    validateFolderId() {
        const folderOption = this.state.folderId.value;
        if(folderOption === "") {
            return 'Picking a folder is required'
        }
    }

    validateName() {
        const name = this.state.name.value.trim();
        if(name.length ===0) {
            return 'Name is required'
        }else if (name.length <3) {
            return 'Name must be at least 3 characters in length'
        }
    }

    validateContent() {
        const content = this.state.content.value.trim()
        if (content.length === 0) {
            return 'Contents of the note are empty, please insert some content'
        }
    }

    render() {
        const nameError = this.validateName();
        const contentError = this.validateContent();
        const folderIdError = this.validateFolderId();
        const modified = new Date().toISOString().slice(0, 10)
        return (
            <form className = "newNote"
            onSubmit = {(e) => this.handleSubmit(e)}>
                <NotefulError>
                    <h2>Add a note</h2>
                    <div className="registration_hint">* required</div>
                    <label htmlFor="name">Name *</label>
                    <input type= "text" className="note_name" name="name" id="name"
                    onChange = {e=> this.updateName(e.target.value, modified)}/>
                    {this.state.name.touched && (<ValidationError message = {nameError}/>)}
                    <label htmlFor="folder">Pick a folder *</label>
                    <select className ="folder_select" onChange= {e=> this.updateFolderId(e.target.value)} required>
                        <option defaultValue = ""></option>
                        {this.context.folders.map(folder =>
                            <option key={folder.id} defaultValue={folder.id} className="folder_option">
                                {folder.name}
                            </option>
                            )}
                    </select>
                    {(this.state.folderId.touched || this.state.content.touched) && (<ValidationError message = {folderIdError}/>)}
                    <label htmlFor="content">Content</label>
                    <input type="text" className="note_content" name="content" id="content"
                    onChange = {e => this.updateContent(e.target.value, modified)}/>
                    {this.state.content.touched && (
                        <ValidationError message = {contentError}/>
                    )}
                    <button type ="submit" className="noteCreate_button"
                    disabled = {
                        this.validateName() ||
                        this.validateFolderId() ||
                        this.validateContent()
                    }>
                        Add Note
                    </button>
                </NotefulError>
            </form>
        )
    }
}