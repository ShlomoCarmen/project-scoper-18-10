import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store.js';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom'


class ManagmentTools extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to scoping</h1>
                <select onChange={(e) => {
                    store.dispatch({ type: 'UPDATA_CORRECT_PROJECT_ID', payload: e.target.value });
                    store.dispatch({ type: 'GET_ALL_DATA' });
                    {/* store.dispatch({ type: 'GET_ACTORS_DB' }); */}
                }}>


                    <option value='' style={{ color: 'red' }} >Select project</option>
                    {
                        this.props.projectsArray.map((elm, i) => {
                            {/* var selected = (this.props.correctProject === elm._id) ? true : false; */}
                        return <option key={elm._id} value={elm._id} selected={this.props.correctProject === elm._id ? 'selected' : ''}>{elm.projectName}</option>
                    })}
                </select>
                {this.props.correctProject === '' ? <CreateNewProject /> : null}
                {this.props.correctProject === '' ? null : <ScopingContinuation />}
            </div>
        );
    }
}


class CreateNewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            editorName: "",
        }
    }


    createNewProject = (state) => {
        axios.post('http://10.2.1.105:3000/createNewProject', { projectName: state.projectName, editorName: state.editorName })
            .then(function (response) {
                console.log(response);
                store.dispatch({type: 'GET_PROJECTS_DB'});
            });
    }
    render() {
        return (
            <div className='newProject'>

                <input type="text" placeholder='ProjectName' onChange={(e) => {
                    this.setState({ projectName: e.target.value })
                }} />
                <input type="text" placeholder='Editor name' onChange={(e) => {
                    this.setState({ editorName: e.target.value })
                }} />

                <button onClick={() => { this.createNewProject(this.state) }}><Link to='/scoping' >Create New Project</Link></button>
            </div>
        );
    }
}

class ScopingContinuation extends Component {
    render() {
        return (
            <div>
                <button><Link to='/scoping' >Continue Scoping</Link></button>
                <CreateNewVersion />
                {/* <button onClick={() =>{ alert('kjkjkj')}}><Link to='/' >Create new version</Link></button> */}
            </div>
        );
    }
}


class CreateNewVersion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rejectionExplenation: "",
            editorName: "",
        }
    }


    createNewVersion = (editorName) => {
        axios.post('http://10.2.1.105:3000/createNewVersion', {editorName})
            .then(function (response) {
                console.log(response);
                // store.dispatch({type: 'GET_ACTORS_DB'});
            });
    }
    render() {
        return (
            <div className='newVersion'>
                <div>
                    <textarea cols="30" rows="10" placeholder='Rejection explenation' onChange={e=>{this.setState({rejectionExplenation: e.target.value})}}></textarea>
                    <button onClick={() => store.dispatch({ type: 'REJECTION_EXPLENATION', payload: this.state.rejectionExplenation })}>Save rejection explenation</button>
                </div>
                <div>
                    <input type="text" placeholder='Editor name' onChange={e => {this.setState({editorName: e.target.value})}}/>
                    <button onClick={() => store.dispatch({ type: 'CREATE_NEW_VERSION', payload: this.state.editorName })}><Link to='/scoping' >Create New Version</Link></button>
                </div>
        </div>
        );
    }
}

export default connect(store => store)(ManagmentTools);