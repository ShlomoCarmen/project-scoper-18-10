import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store';
import RichEditor from '../richEditor/richEditor.js'
import '../richEditor/richEditor.css';

class AddProjectDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectDescription: this.props.projectDescription,
      editMode: true,
    }
    if (this.state.projectDescription !== '') {
      this.state.editMode = false;
    }
  }
  render() {
    return (
      <div className='formContainer description' >
        {/* <textarea className="projectDescreptionInput" placeholder='Describe the project' value={this.state.projectDescription}
         onChange={e => { this.setState({ projectDescription: e.target.value })}}  disabled={this.state.editMode ? null : "disabled"}></textarea>
         {this.state.editMode ? null : <div className='icon btn_edit' onClick={()=>this.setState({editMode: true})}>✎</div>}
         {this.state.editMode ? <button className="saveBtn" onClick={() => {
          this.setState({editMode: false})
          store.dispatch({ type: 'PROJECT_DESCREPTION', payload: this.state.projectDescription })}}>Save</button> : null} */}
          <RichEditor/>
        
      </div>
    );

  }
}
export default connect(store => store)(AddProjectDescription);