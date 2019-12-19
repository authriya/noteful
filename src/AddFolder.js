import React from 'react'
import ValidationError from './ValidationError'
import ApiContext from './ApiContext'
import NotefulError from './NotefulError'
import './AddFolder.css'

export default class AddFolder extends React.Component{
    static contextType = ApiContext
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ' ',
                touched: false
            }
        };
    }
    updateName(name) {
        this.setState({name:{value:name, touched: true}});
    }

    handleSubmit(event) {
        event.preventDefault();
        const folder = {
            name: this.state.name.value
        }
        const url = `http://localhost:9090/folders`
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
        .then(res=> {
            if(!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            this.setState({
                name:{value: ' '}
            })
            this.context.addFolder(data)
            console.log(this.context);
            this.props.history.push(`/`)
        })

    }

    validateName() {
        const name = this.state.name.value.trim();
        if(name.length === 0) {
            return 'Name is required';
        }
        else if(name.length <3){
            return 'Name must be at least 3 characters long'
        }
    }

    render() {
        const nameError = this.validateName();
        return (
            <form className = "newFolder"
                onSubmit = {(e) => this.handleSubmit(e)}>
                <NotefulError>
                    <h2>Create a new folder!</h2>
                    <div className="folderCreation__hint">* required field</div>
                    <label htmlFor="name">Folder Name *</label> 
                    <input 
                        type = "text" 
                        className = "folderCreation"
                        name = "name" 
                        id = "name" 
                        onChange = {e => this.updateName(e.target.value)}/>
                    {this.state.name.touched && (
                    <ValidationError message = {nameError}/>
                    )}
                    <button
                        type = "submit"
                        className = "folderCreation_button"
                        disabled = {
                            this.validateName() 
                        }>
                        Create Folder
                    </button>
                </NotefulError>
            </form>
        )
    }
}