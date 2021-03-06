import axiosWithAuth from "../utils/axiosWithAuth";
export const ADD_POST = "ADD";  //create a post
export const ALTER_LOCATION_STATE = "ALTER_LOCATION_STATE";
export const DELETE_POST = "DELETE_POST";  //delete a post
export const DOWN_VOTE = "DOWN_VOTE"; // PUT REQUEST plus filter to reorder list of comments
export const EDIT_THIS_ISSUE = "EDIT_THIS_ISSUE";
export const GET_BY_LOCATION = "GET_BY_LOCATION";
export const INIT_HOME = "INIT_HOME";  // get all posts for home page dashboard
export const INIT_PROFILE = "INIT_PROFILE";  // get all posts for home page dashboard  ie: upvoted posts and created posts
export const LOGOUT = "LOGOUT"
export const RESET_ISSUE_TO_EDIT = "RESET_ISSUE_TO_EDIT"
export const SELECT_ITEM_TO_DELETE = "SELECT_ITEM_TO_DELETE"
export const SET_PROFILE_ISSUES = "SET_PROFILE_ISSUES";
export const TOGGLE_FORM = "TOGGLE_FORM";
export const UNSELECT_ITEM_TO_DELETE = "UNSELECT_ITEM_TO_DELETE"
export const UP_VOTE = "UP_VOTE"; // PUT REQUEST plus filter to reorder list of comments
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";


const initialState = {
    issues: [],
    profileIssues: [],
    userProfile: {
        username: 'William777',
        location: 'New York',
        password: '12345',
    },
    voteProfile: [],
    showForm: false,
    issueToEdit: {},
    deleteQueue: {},
    location: true
};
const appReducer = (state, action) => {
    switch (action.type) {
        case ALTER_LOCATION_STATE:
            return {
                ...state,
                location: action.payload
            };
        case ADD_POST:
            return {
                ...state,
                issues: action.payload,
                showForm: false,
                issueToEdit: {},
                deleteQueue: {},
            };
        case DELETE_POST:
            return {
                ...state,
                issues: action.payload
            }
        case DOWN_VOTE:
            return {
                ...state,
                voteProfile: action.payload
            }
        case EDIT_THIS_ISSUE:
            return {
                ...state,
                issueToEdit: action.payload
            }
        case GET_BY_LOCATION:
            return {
                ...state,
                issues: action.payload
            };
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
        case LOGOUT:
            localStorage.clear("token");
            action.payload.history.push("/login");
            break;
        case RESET_ISSUE_TO_EDIT:
            console.log("reset issue to edit is firing")
            return {
                ...state,
                issueToEdit: {}
            };
        case SELECT_ITEM_TO_DELETE:
            return {
                ...state,
                deleteQueue: action.payload
            };
        case SET_PROFILE_ISSUES:
            return {
                ...state,
                profileIssues: action.payload
            }
        case TOGGLE_FORM:
            return {
                ...state,
                showForm: !state.showForm
            };
        case UNSELECT_ITEM_TO_DELETE:
            console.log("unselect item to delete is firing")
            return {

                ...state,
                deleteQueue: {}
            };
        case UP_VOTE:
            return {
                ...state,
                voteProfile: action.payload
            };
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                userProfile: { ...state.userProfile, ...action.payload }
            }
        default:
            return state;
    };
};
export { appReducer, initialState }