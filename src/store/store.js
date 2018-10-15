import { createStore } from 'redux'
import { sendActor, getActors, getAllData, deleteActor, getProjects, rejectionExplenation, createNewVersion, projectDescription ,sendUserStory, editActor} from '../axios/axios'


var mainState = {
    controler: {
        updateFirst: true
    },
    projectsArray: [],
    correctProject: '',
    projectDescription: '',
    actorsArray: []
}

var reduser = function (state, action) {
    var newState = { ...state };
    switch (action.type) {
        case "REJECTION_EXPLENATION":
            rejectionExplenation(newState.correctProject, action.payload);
            return newState
            break;
        case "CREATE_NEW_VERSION":
            createNewVersion(newState.correctProject, action.payload);
            return newState
            break;
        case "STATE_HAS_UPDATE":
            newState.controler.updateFirst = false;
            return newState
            break;
        case "PROJECT_DESCREPTION":
            projectDescription(newState.correctProject, action.payload);
            return newState;
            break;

        case "SAVE_ACTOR":
            let actorTemplate = {
                actorName: action.payload.actorName,
                actorDescription: action.payload.actorDescription,
                userStories: []
            };
            sendActor(actorTemplate, newState.correctProject);
            return newState;
            break;

        case "GET_PROJECTS_DB":
            getProjects();
            return newState;
            break;
        case "UPDATE_STATE_PROJECTS":
            newState.projectsArray = action.payload;
            return newState;
            break;
        case "UPDATA_CORRECT_PROJECT_ID":
            newState.correctProject = action.payload;
            console.log(action.payload);

            return newState;
            break;

        case "GET_ACTORS_DB":
            getActors(newState.correctProject);
            return newState;
            break;
        case "UPDATE_STATE_ACTORS":
            console.log(action.payload);
            newState.actorsArray = action.payload;
            console.log(newState);
            return newState;
            break;

        case "GET_ALL_DATA":
            getAllData(newState.correctProject);
            return newState;
            break;

        case "UPDATE_STATE":
            console.log(action.payload);
            newState.projectDescription = action.payload.projectDescription;
            newState.actorsArray = action.payload.allActors;
            console.log(newState);
            return newState;
            break;

        case "DELETE_ACTOR":
            deleteActor(newState.correctProject, action.payload);
            return newState;
            break;
        case "EDIT_ACTOR":
            console.log(action.payload);
            
            editActor(newState.correctProject, action.payload);
            return newState;
            break;

        case "ADD_USER_STORY":
        sendUserStory(newState.correctProject, action.payload.indexOfActor, action.payload.userStory);
            return newState
            break;
        default:
            return newState;
            break;
    }
    // return newState;
}

var store = createStore(reduser, mainState)
export default store

// import reducer from '../reducers/dbReducer.js'
// import * as dbReducer from '../reducers/dbReducer.js'
// import {createStore, combineReducers} from 'redux'
// import {connect} from 'react-redux'

// var state = {
//         projectDescription: '',
//         actorsArray: []
//     }

// const reducersManager = combineReducers({dbReducer})

// const store = createStore(reducersManager, state = dbReducer.state1 )

// export default store

