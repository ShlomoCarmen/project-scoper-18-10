import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store';

class AddUserStories extends Component {
    constructor(props) {
        super(props);
        let state = {};
        this.props.actorsArray.map((elm) => {
            state[elm._id] = {
                showInput: false,
            }

        })
        this.state = state;
    }
    displayInput = (elm) => {
        var showInput = this.state[elm._id].showInput;
        this.setState({
            [elm._id]: {
                showInput: !showInput
            }
        });
    }
    render() {
        return (
            <div className='formContainer'>
                {this.props.actorsArray.map((elm, i) => {
                    return <div className='addUserStory' key={i} >
                        <div className='addUserStoryActor' onClick={() => {
                            console.log(i);
                            this.displayInput(elm)
                        }}>{elm.actorName}</div>
                        {this.state[elm._id].showInput ? <AddUserStory actor={elm} indexOfActor={i} /> : null}
                    </div>
                })}
            </div>
        )
    }
}


class AddUserStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: `As a ${this.props.actor.actorName}: `
        }
    }
    render() {
        return (
            <div className='userStoryInput'>
                <ShowAllUserStory userStoreis={this.props.actor.userStoreis} indexOfActor={this.props.indexOfActor}/>
                <textarea onChange={(e) => { this.setState({ input: e.target.value }) }} value={this.state.input}>
                </textarea>
                <button className="saveBtn" onClick={() => {
                    store.dispatch({
                        type: 'ADD_USER_STORY', payload: {
                            indexOfActor: this.props.indexOfActor,
                            id: this.props.actor.id,
                            userStory: this.state.input
                        }
                    })
                    this.setState({ input: `As a ${this.props.actor.actorName}: ` });
                }}>save</button>
            </div>
        )
    }
}

class ShowAllUserStory extends Component {
    render() {
        return (
            <div className='viewUserStory'>
                {this.props.userStoreis.map((elm, index) => {
                    return <div className='singleUserStory' key={index}>
                        <p className='details'>{elm}</p>
                        <div className='iconDiv'>
                        <div className='icon btn_edit' onClick={()=>{store.dispatch({type: 'DELETE_USER_STORY', payload: {indexOfActor: this.props.indexOfActor, storyLocation: index}})}}>✎</div>
                        <div className='icon btn_delete' onClick={()=>{store.dispatch({type: 'DELETE_USER_STORY', payload: {indexOfActor: this.props.indexOfActor, storyLocation: index}})}}>🗑</div>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}


export default connect(store => store)(AddUserStories);

