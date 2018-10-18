import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store';
import Assumptions from './assumptions'

class AttechDrow extends Component {
  render() {
    return (
      <div className="assumptionContainer">
        <Assumptions />
      </div>
    );
  }
}
export default AttechDrow;