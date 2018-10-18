import axios from 'axios';
import store from '../store/store.js';
import {urlLinks} from '../linkes.js'


export var rejectionExplenation = (correctProject, rejectionExplenation) => {
    console.log(rejectionExplenation);
    axios.put(`rejection/${correctProject}`, {rejectionExplenation})
    .then(function (res) {
        console.log(res);
    });
}
export var createNewPrject = (correctProject, state) => {
    axios.post(urlLinks.createNewProject, { projectName: state.projectName, editorName: state.editorName })
    .then(function (response) {
        console.log(response);
        store.dispatch({ type: 'GET_PROJECTS_DB' });
    });
   
}
export var createNewVersion = (correctProject, editorName) => {
    console.log(editorName);
    
    axios.put(`/newVersion/${correctProject}`, {editorName})
    .then(function (res) {
        // store.dispatch({type: 'GET_ACTORS_DB'});
        console.log(res);
    });
}
export var projectDescription = (correctProject, projectDescription) => {
    axios.put(`/projectDescription/${correctProject}`,  {projectDescription})
    .then(function (res) {
        // store.dispatch({type: 'GET_ALL_DATA '});
        console.log(res);
    });
}
export var sendActor = (actor, correctProject) => {
    
    axios.put(`${urlLinks.sendActor}/${correctProject}`,  actor)
    .then(function (res) {
        store.dispatch({type: 'GET_ACTORS_DB'});
        console.log(res);
    });
}
export var sendUserStory = (correctProject, indexOfActor, userStory) => {
    axios.put(`/userStoreis/${correctProject}/${indexOfActor}`,  {userStory})
    .then(function (res) {
        store.dispatch({type: 'GET_ACTORS_DB'});
        console.log(res);
    });
}

export var deleteUserStory = (correctProject, userStory) => {
    axios.delete(`${urlLinks.deleteUserStory}/${correctProject}/${userStory.indexOfActor}/${userStory.storyLocation}`)
    .then(function(res) {
        console.log(res);
        store.dispatch({type: 'GET_ACTORS_DB'});
    });
}
export var getActors = (correctProject) => {
    axios.get(`${urlLinks.getActors}/${correctProject}`)
    .then(function(response) {
        console.log(response);
        
        store.dispatch({type: 'UPDATE_STATE_ACTORS', payload: response.data});
    });
}
export var getAllData = (correctProject) => {
    axios.get(`allData/${correctProject}`)
    .then(function(res) {
        console.log(res);
        
        store.dispatch({type: 'UPDATE_STATE', payload: res.data});
    });
}
export var deleteActor = (correctProject, actorIndex) => {
    // console.log(`${urlLinks.deleteActor}${correctProject}/${actorIndex}`);
    
    axios.delete(`${urlLinks.deleteActor}${correctProject}/${actorIndex}`)
    .then(function(res) {
        console.log(res);
        
        store.dispatch({type: 'GET_ACTORS_DB'});
    });
}
export var editActor = (correctProject, actor) => {
    // console.log(`${urlLinks.deleteActor}${correctProject}/${actorIndex}`);
    
    axios.put(`${urlLinks.editActor}/${correctProject}/${actor.editActorIndex}`, {actorName: actor.actorName, actorDescription: actor.actorDescription})
    .then(function(res) {
        console.log(res);
        
        store.dispatch({type: 'GET_ACTORS_DB'});
    });
}

export var getProjects = () => {
    axios.get(urlLinks.getProjects)
    .then(function(response) {
        store.dispatch({type: 'UPDATE_STATE_PROJECTS', payload: response.data});
    });
}
