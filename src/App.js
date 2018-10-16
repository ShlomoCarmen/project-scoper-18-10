import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import store from './store/store';
import AddActors from "./pages/addActors.js";
import AddUserStories from './pages/AddUserStory.js';
import AddProjectDescription from './pages/addProjectDescription.js';
import AttechDrow from './pages/attechDrow.js';
import ManagmentTools from './pages/managmentTools.js';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { pageLinkes } from './linkes'
import { Row, Col } from 'reactstrap'

class NavBar extends Component {
  render() {
    return (
      <div className="navBar">
        <Link className to={pageLinkes.mangementTools} >Managment Tools</Link>
        <Link to={pageLinkes.projectDescreption} >Add Project Discraption</Link>
        <Link to={pageLinkes.actors}>Add Actors</Link>
        <Link to={pageLinkes.userStory}>Add User Story</Link>
        <Link to={pageLinkes.drow_io}>Attach Drow.is</Link>
      </div>
    );
  }
}




class MainScreen extends Component {
  render() {
    return (
      <div className='mainScreen'>
        <Route exact path={pageLinkes.mangementTools} component={ManagmentTools} />
        {/* <Route path='/scoping' component={NavBar} /> */}
        <Route path={pageLinkes.projectDescreption} component={AddProjectDescription} />
        <Route path={pageLinkes.actors} component={AddActors} />
        <Route path={pageLinkes.userStory} component={AddUserStories} />
        <Route path={pageLinkes.drow_io} component={AttechDrow} />
      </div>
    );
  }
}


class App extends Component {
  defineState = () => {
    if (this.props.controler.updateFirst) {
      store.dispatch({ type: 'GET_PROJECTS_DB' });
      store.dispatch({ type: 'STATE_HAS_UPDATE' });
    }
  }
  render() {
    this.defineState();
    return (
      <BrowserRouter >
        <div className='maincContainer'>
          <Row className='header'>SCOPER</Row>
          <Row className='articleFirst'> <NavBar /></Row>
          <Row className='articleSecond'> <MainScreen /></Row>
          <Row className='footer'><footer>create by COD Team ☺</footer></Row>
        </div>
      </BrowserRouter>
    );
  }
}


export default connect(store => store)(App);
