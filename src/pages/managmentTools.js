import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store.js';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import {imgLinks} from '../linkes.js'


class ManagmentTools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayPdf: false
        }
    }
    render() {
        return (
            <div>
                <h1>Start scoping</h1>
                <select onChange={(e) => {
                    store.dispatch({ type: 'UPDATA_CORRECT_PROJECT_ID', payload: e.target.value });
                    store.dispatch({ type: 'GET_ALL_DATA' });
                }}>


                    <option value='' style={{ color: 'red' }} >Select project</option>
                    {
                        this.props.projectsArray.map((elm, i) => {
                            return <option key={elm._id} value={elm._id} selected={this.props.correctProject === elm._id ? 'selected' : ''}>{elm.projectName}</option>
                        })}
                </select>
                {this.props.correctProject === '' ? <CreateNewProject /> : null}
                {this.props.correctProject === '' ? null : <ScopingContinuation store={this.props} />}

            </div>
        );
    }
}


class PDFpreview extends Component {

    render() {
        return (
            <div className="pdfPreview">
                <div className="mainBlbBla">
                    <h3 className="pdfPreviewTitel"><b> Offer for Development of Disk In Pro <br/> NEAR phase 2 web app </b></h3><br />
                    <b className="pdfOverview"> Overview</b> <br/><br/>
                    Founded 5 years ago in Bnei Brak, RavTech is a one-of-a-kind software house, providing a <br />
                    wide range of software services and specializing in Mobile, Web sites, IoT and Automation <br />
                    QA. With over 70 developers, all of which are excelled Talmudic college alumni, RavTech adds <br />
                    a unique value to its clients. This endeavor was launched by the Ultra-Orthodox community <br />
                    itself and is co-managed by some of Israel’s top high-tech personas. ​​<br /><br />
                    Our clients' portfolio includes multi-national companies such as Check Point, EMC, HP, City Bank <br />
                    and so on, as well as many early and late-stage startups. <br /><br />
                    We offer our customers a long-lasting partnership along with professional peace of mind <br />
                    throughout the entire software development life-cycle.<br /><br />
                    Our services include, among others, the following:<br /><br />
                    <ul>
                        <li> Mobile end-to-end: native Android, native iOS, client & server architecture </li>
                        <li>Content Web sites and complex Web applications - client & server </li>
                        <li>IoT: Sensors connectivity and probing, embedded environment integration and communication.</li>
                        <li>Dashboard & Monitoring: Javascript, Angular JS, HTML5, Python, PHP</li>
                        <li>Automation QA: planning automation testing frameworks - client-server, load, performance and more</li>
                        <li>ALM & DevOps: installation & upgrades, resource monitoring, Chef, Jenkins</li>
                    </ul>

                </div>

                <div className="imgDiv">
                    {imgLinks.map((img, i)=>{
                        return <img src={img} alt=""/>
                    })}
                </div>
                <p> <p className="pdfOverview"><b> Project</b></p> {this.props.store.projectDescription}</p>
                <div><p className="pdfOverview"><b>The Actors/Users:</b> </p>{this.props.store.actorsArray.map((elm, i) => {
                    return <div key={i}>
                        <p>{i + 1 + "."} <ins> {elm.actorName} </ins> <br /> {elm.actorDescription} </p>
                    </div>
                })}</div>
                <div> <p className="pdfOverview"><b>Requirements/User Stories:</b> </p>
                    {this.props.store.actorsArray.map((elm, i) => {
                        return <div><br/><ins>{elm.actorName + " new user stories"}</ins><br /><br />
                            {elm.userStoreis.map((story, i) => {
                                return <div key={i}> {i + 1}.   {story}<br /></div>
                            })}
                        </div>
                    })}
                </div>
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
        axios.post('http://10.2.1.103:3000/createNewProject', { projectName: state.projectName, editorName: state.editorName })
            .then(function (response) {
                console.log(response);
                store.dispatch({ type: 'GET_PROJECTS_DB' });
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
    constructor(props) {
        super(props);
        this.state = {
            newVersionMode: false,
            displayPdf: false
        }
    }
    cancelNewVersionMode = () => {
        this.setState({ newVersionMode: false })
    }
    render() {
        console.log(this.props.store);

        return (
            <div>
                {this.state.newVersionMode ? null : <button><Link to='/scoping' >Continue Scoping</Link></button>}
                {this.state.newVersionMode ? null : <button onClick={() => this.setState({ newVersionMode: true })}>New version</button>}
                {this.state.newVersionMode ? <CreateNewVersion cancelNewVersionMode={this.cancelNewVersionMode} /> : null}
                <button onClick={() => this.setState({ displayPdf: !this.state.displayPdf })}>view all data</button>

                {this.state.displayPdf ? <PDFpreview store={this.props.store} /> : null}
            </div>
        );
    }
}



class CreateNewVersion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rejectionStatus: true,
            editorNameStatus: false,
            rejectionExplenation: "",
            editorName: "",
        }
    }

    render() {
        return (
            <div className='newVersion'>
                {
                    this.state.rejectionStatus ? <div>
                        <textarea cols="30" rows="10" placeholder='Rejection explenation' onChange={e => { this.setState({ rejectionExplenation: e.target.value }) }}></textarea>
                        <br />
                        <button onClick={this.props.cancelNewVersionMode}>Cancel</button>
                        <button onClick={() => {
                            this.setState({ rejectionStatus: false, editorNameStatus: true })
                            store.dispatch({ type: 'REJECTION_EXPLENATION', payload: this.state.rejectionExplenation })
                        }}>Save rejection explenation</button>
                    </div>
                        : null}
                {
                    this.state.editorNameStatus ? <div>
                        <input type="text" placeholder='Editor name' onChange={e => { this.setState({ editorName: e.target.value }) }} />
                        <button onClick={() => store.dispatch({ type: 'CREATE_NEW_VERSION', payload: this.state.editorName })}><Link to='/scoping' >Create New Version</Link></button>
                    </div>
                        : null}
            </div>
        );
    }
}

export default connect(store => store)(ManagmentTools);