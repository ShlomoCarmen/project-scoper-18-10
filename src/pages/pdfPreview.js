import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import store from '../store/store.js';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import {imgLinks} from '../linkes.js'


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
                    Our clients portfolio includes multi-national companies such as Check Point, EMC, HP, City Bank <br />
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
                <p> <p className="pdfOverview"><b> Project</b></p> {this.props.projectDescription}</p>
                <div><p className="pdfOverview"><b>The Actors/Users:</b> </p>{this.props.actorsArray.map((elm, i) => {
                    return <div key={i}>
                        <p>{i + 1 + "."} <ins> {elm.actorName} </ins> <br /> {elm.actorDescription} </p>
                    </div>
                })}</div>
                <div> <p className="pdfOverview"><b>Requirements/User Stories:</b> </p>
                    {this.props.actorsArray.map((elm, i) => {
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

export default connect(store => store)(PDFpreview);
