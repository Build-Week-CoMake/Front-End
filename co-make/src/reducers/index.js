import axiosWithAuth from "../utils/axiosWithAuth";

export const ADD_POST = "ADD";  //create a post
export const DELETE_POST = "DELETE_POST";  //delete a post
export const UPDATE_POST = "UDATE_POST";  //update a post
export const INIT_HOME = "INIT_HOME";  // get all posts for home page dashboard
export const INIT_PROFILE = "INIT_PROFILE";  // get all posts for home page dashboard  ie: upvoted posts and created posts
export const UP_VOTE = "UP_VOTE"; // PUT REQUEST plus filter to reorder list of comments
export const DOWN_VOTE = "DOWN_VOTE"; // PUT REQUEST plus filter to reorder list of comments
export const LOGOUT = "LOGOUT"



const initialState = {
    issues: [], // state for main dashboard
    profile: [] //state for profile page
};

const appReducer = (state, action) => {
    switch (action.type) {
        case ADD_POST:
            axiosWithAuth()
                .post("/issues", action.payload)
                .then(res => {
                    console.log(res, "response from ADD_POST function");
                    return {
                        ...state,
                        issues: res.data
                    }
                })
                .catch(err => {
                    console.log(err, "error from ADD_POST function");
                });
        case DELETE_POST:
            axiosWithAuth()
                .delete(`/issues/${action.payload}`)
                .then(res => {
                    console.log(res, "response from DELETE_POST function");
                    return {
                        ...state,
                        issues: res.data
                    }
                })
                .catch(err => {
                    console.log(err, "error from DELETE_POST function");
                });
        case UPDATE_POST:
            axiosWithAuth()
                .put(`/issues/${action.payload.id}`, action.payload)
                .then(res => {
                    console.log(res, "response from UPDATE_POST function");
                    return {
                        ...state,
                        issues: res.data
                    }
                })
                .catch(err => {
                    console.log(err, "error from UPDATE_POST function");
                });
        case INIT_HOME:
            return {
                ...state,
                issues: action.payload
            }
        case INIT_PROFILE:
            axiosWithAuth()
                .post("/issues", action.payload)
                .then(res => {
                    console.log(res, "response from ADD_POST function");
                    return {
                        ...state,
                        profile: action.payload
                    }
                })
                .catch(err => {
                    console.log(err, "error from ADD_POST function");
                });
        case UP_VOTE:
            axiosWithAuth()
                .put(`/voted/${action.payload}`)
                .then(res => {
                    console.log(res, "response from UPDATE_POST function");
                    return {
                        ...state,
                        issues: res.data,
                        profile: res.data
                    }
                })
                .catch(err => {
                    console.log(err, "error from UPDATE_POST function");
                });
        case DOWN_VOTE:
            axiosWithAuth()
                .delete(`/voted/${action.payload}`)
                .then(res => {
                    console.log(res, "response from UPDATE_POST function");
                    return {
                        ...state,
                        issues: res.data,
                        profile: res.data
                    }
                })
                .catch(err => {
                    console.log(err, "error from UPDATE_POST function");
                });
        case LOGOUT:
            localStorage.clear("token");
            action.payload.history.push("/login");
        default:
            return state
    }
}

export { appReducer, initialState }