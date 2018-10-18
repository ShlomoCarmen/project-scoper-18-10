import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import store from '../store/store.js';
import {dispatchKeys} from '../linkes.js'

class AddActors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editActorIndex: '',
            editMonde: false,
            handleActorInput: '',
            handleActorDescriprionInput: ''
        }
    }

    saveData = () => {
        store.dispatch({
            type: "SAVE_ACTOR", payload: {
                actorName: this.state.handleActorInput,
                actorDescription: this.state.handleActorDescriprionInput,
            }
        });
        this.setState({
            handleActorInput: '',
            handleActorDescriprionInput: ''
        });
    }
    editActor = () => {
        store.dispatch({
            type: "EDIT_ACTOR", payload: {
                editActorIndex: this.state.editActorIndex,
                actorName: this.state.handleActorInput,
                actorDescription: this.state.handleActorDescriprionInput,
            }
        });
        this.setState({
            editMonde: false,
            handleActorInput: '',
            handleActorDescriprionInput: ''
        });
    }

    saveBtn = () =>{
        var inputEmpty = this.state.handleActorInput === '' || this.state.handleActorDescriprionInput === '';
       return <button className={inputEmpty ? 'disableBtn': 'saveBtn'} onClick={this.saveData}>Add</button>
    }
    
    render() {
        return (
            <div className='formContainer'>
                <input className='actorsInput' placeholder='Actor name' value={this.state.handleActorInput}
                    onChange={(e) => {
                        this.setState({
                            handleActorInput: e.target.value
                        })
                    }}
                />
                <textarea className='actorDescription' placeholder='Actor description' value={this.state.handleActorDescriprionInput}
                    onChange={(e) => {
                        this.setState({
                            handleActorDescriprionInput: e.target.value
                        })
                    }}
                />
                <br />
                {this.state.editMonde ? null : this.saveBtn()}
                {this.state.editMonde ? <button className='editBtn' onClick={this.editActor}>Edit</button> : null}
                <div className='showActors'>
                    {this.props.actorsArray.map((elm, index) => {
                        return <div id='actorView' key={index}>
                        <div className='details'>       
                            <u>{elm.actorName}</u>
                            <p>{elm.actorDescription}</p>
                        </div>
                            <div className='iconDiv'>
                            <div className='icon btn_delete' onClick={()=>{this.props.dispatch({type: 'DELETE_ACTOR', payload: index})}}>🗑</div>
                            <div className='icon btn_edit' onClick={()=>{
                                this.setState({
                                    editActorIndex: index,
                                    editMonde: true,
                                    handleActorInput: elm.actorName,
                                    handleActorDescriprionInput: elm.actorDescription
                                })
                                }}>✎</div>
                                </div>
                               
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default connect(store => store)(AddActors);