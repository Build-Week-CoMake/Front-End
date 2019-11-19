import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";
export const ADD_POST = "ADD";  //create a post
export const DELETE_POST = "DELETE_POST";  //delete a post
export const SELECT_ITEM_TO_DELETE = "SELECT_ITEM_TO_DELETE"
export const UNSELECT_ITEM_TO_DELETE = "UNSELECT_ITEM_TO_DELETE"
export const UPDATE_POST = "UDATE_POST";  //update a post
export const INIT_HOME = "INIT_HOME";  // get all posts for home page dashboard
export const INIT_PROFILE = "INIT_PROFILE";  // get all posts for home page dashboard  ie: upvoted posts and created posts
export const UP_VOTE = "UP_VOTE"; // PUT REQUEST plus filter to reorder list of comments
export const DOWN_VOTE = "DOWN_VOTE"; // PUT REQUEST plus filter to reorder list of comments
export const LOGOUT = "LOGOUT"
export const TOGGLE_FORM = "TOGGLE_FORM";
export const EDIT_THIS_ISSUE = "EDIT_THIS_ISSUE";
export const RESET_ISSUE_TO_EDIT = "RESET_ISSUE_TO_EDIT"
export const GET_BY_LOCATION = "GET_BY_LOCATION";


const initialState = {
    issues: [
        {
            title: 'Lots of good stuff',
            location: 'New York',
            description: 'nice nice nice very nice nice nice nice verery nice nice nice nice verery nice nice nice nice verery nice nice nice nice very nice nice nice nice very nicenice nice nice very nicenice nice nice very nicenice nice nice very nicenice nice nice very nicenice nice nice very nice'
        },
        {
            title: 'Lots of good stuff',
            location: 'New York',
            description: 'nice nice nice very nice'
        },
        {
            title: 'Lots of good stuff',
            location: 'New York',
            description: 'nice nice nice very nice'
        },
        {
            title: 'Lots of good stuff',
            location: 'New York',
            description: 'nice nice nice very nice'
        }
    ], // state for main dashboard
    profileIssues: [
        {
            title: 'Lots of good stuff',
            location: 'New York',
            description: 'nice nice nice very nice nice nice nice verery nice nice nice nice verery nice nice nice nice verery nice nice nice nice very nice nice nice nice very nicenice nice nice very nicenice nice nice very nicenice nice nice very nicenice nice nice very nicenice nice nice very nice'
        },
        {
            title: 'Lots of good stuff',
            location: 'New York',
            description: 'nice nice nice very nice'
        },
        {
            title: 'Lots of good stuff',
            location: 'New York',
            description: 'nice nice nice very nice'
        },
        {
            title: 'Lots of good stuff',
            location: 'New York',
            description: 'nice nice nice very nice'
        }
    ], //state for profile page
    userProfile: {
        userName: 'William777',
        location: 'New York',
        password: '12345',
    },
    showForm: false,  //change to true to display modal to create a new issue/complaint
    issueToEdit: {},
    deleteQueue: {}
};
const appReducer = (state, action) => {
    switch (action.type) {
        case SELECT_ITEM_TO_DELETE:
            return {
                ...state,
                deleteQueue: action.payload
            }
        case UNSELECT_ITEM_TO_DELETE:
            return {
                ...state,
                deleteQueue: {}
            }
        case EDIT_THIS_ISSUE:
            return {
                ...state,
                issueToEdit: action.payload
            }
        case RESET_ISSUE_TO_EDIT:
            return {
                ...state,
                issueToEdit: {}
            }
        case TOGGLE_FORM:
            return {
                ...state,
                showForm: !state.showForm
            }
        case GET_BY_LOCATION:
            return {
                ...state,
                issues: action.payload
            }
        case ADD_POST:
            return {
                ...state,
                issues: action.payload,
                showForm: false
            }
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
            break;
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
            break;
        case INIT_HOME:
            return {
                ...state,
                issues: action.payload
            }
            break;
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
            break;
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
            break;
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
            break;
        case LOGOUT:
            localStorage.clear("token");
            action.payload.history.push("/login");
            break;
        default:
            return state
    }
}
export { appReducer, initialState }