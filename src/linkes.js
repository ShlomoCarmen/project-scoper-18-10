export const pageLinkes = {
    // mangementTools:'/scoping/managment-tools',
    mangementTools:'/',
    projectDescreption: '/scoping/project-descreption',
    actors: '/scoping/actors',
    userStory: '/scoping/user-story',
    drow_io: '/scoping/drow.io',
    // mangementTools:'/managment-tools',
    // projectDescreption: '/project-descreption',
    // actors: '/actors',
    // userStory: '/user-story',
    // drow_io: '/drow.io',
}

// const mainURL = "http://10.2.1.102:3000";
const mainURL = "http://10.2.1.103:3000";
// const mainURL = "http://10.2.1.106:3000";
export const urlLinks = {
    sendActor: mainURL + '/actor',
    getActors: mainURL + '/allActors',
    deleteActor: mainURL + '/actor/',
    editActor: mainURL + '/editActor',
    getProjects: mainURL + '/allProjects',
    deleteUserStory: mainURL + '/userStoreis',
}


export const dispatchKeys = {
    actor: {
        saveActor: "SAVE_ACTOR",
    }
}