import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store';

class AddProjectDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectDescription: this.props.projectDescription
    }
  }
  render() {
    return (
      <div className='formContainer' >
        <textarea className="projectDescreptionInput" placeholder='Project DescreptionInput' value={this.state.projectDescription}
         onChange={e => { this.setState({ projectDescription: e.target.value })}}></textarea>
        <button className="saveBtn" onClick={() => store.dispatch({ type: 'PROJECT_DESCREPTION', payload: this.state.projectDescription })}>Save</button>
      </div>
    );

  }
}
export default connect(store => store)(AddProjectDescription);