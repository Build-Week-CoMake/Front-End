import React, { useState, useContext } from 'react'
import styled from "styled-components";
import { CoMakeContext } from "../context/CoMakeContext";
import { UP_VOTE, DOWN_VOTE, TOGGLE_FORM, SELECT_ITEM_TO_DELETE, EDIT_THIS_ISSUE, ADD_POST } from "../reducers";
import { ALTER_LOCATION_STATE, SET_PROFILE_ISSUES } from "../reducers";
import axiosWithAuth from "../utils/axiosWithAuth";

const StyledVoteButton = styled.button`
    // height:20px;
    // width:45px;
    // border-radius:45px;
    // background-color:#DCDCDC;
    // color: black;
`;
const StyledADDButton = styled.button`
    // height:35px;
    // width:100px;
    // border-radius:45px;
    // background-color:red;
    // color: black;
`;
const StyledEditButton = styled.button`
    // height:20px;
    // width:50px;
    // border-radius:45px;
    // background-color:#DCDCDC;
    // color: black;
`;

const StyledDeleteButton = styled.button`
    // height:35px;
    // width:35px;
    // border-radius:45px;
    // background-color:red;
    // color: black;
    // font-size: .4 rem;

`;

const Bar1 = styled.div
    `  width: 35px;
height: 3px;
background-color: #333;
margin: 3px 0;
transition: 0.4s;`

const Bar2 = styled.div
    `  width: 35px;
height: 3px;
background-color: #333;
margin: 6px 0;
transition: 0.4s;`

const Bar3 = styled.div
    `  width: 35px;
height: 3px;
background-color: #333;
margin: 3px 0;
transition: 0.4s;`

const BurgerButton = styled.div
    `
`
const StyledSideNavButton = styled.button`
padding: .6rem 1.6rem;
// height:35px;
// width:100px;
// border-radius:45px;
// background-color:#DCDCDC;
// color: black;
`;

function VoteButton(props) {
    const { state } = useContext(CoMakeContext);
    const voted = props.didVote;
    const { dispatch } = useContext(CoMakeContext);
    const voteHandler = async (e) => {
        e.preventDefault();
        if (voted) {
            let data = await axiosWithAuth()
                .delete(`/upvote/${props.eachIssue.id}`)
            dispatch({
                type: DOWN_VOTE,
                payload: data.data
            });
            axiosWithAuth()
                .get(`/issues?user_id=${state.userProfile.username}`)
                .then(res => {
                    // console.log("get issues by username", res.data);
                    dispatch({ type: SET_PROFILE_ISSUES, payload: res.data.sort((a, b) => b.count - a.count) });
                });
            if (state.location) {
                let dashboardRefresh = await axiosWithAuth()
                    .get(`/issues?location=${props.eachIssue.location}`)

                dispatch({
                    type: ADD_POST,
                    payload: dashboardRefresh.data.sort((a, b) => b.count - a.count)
                });
            } else {
                axiosWithAuth()
                    .get("/issues")
                    .then(res => {
                        // console.log(res, "res from axios in Edit Button.js")
                        dispatch({
                            type: ADD_POST,
                            payload: res.data.sort((a, b) => b.count - a.count)
                        });
                    })
                    .catch(err => {
                        console.log(err, "error from axios EditButton.js")
                    })
            };

        } else {
            let data = await axiosWithAuth()
                .post(`/upvote/${props.eachIssue.id}`)
            dispatch({
                type: UP_VOTE,
                payload: data.data
            });
            axiosWithAuth()
                .get(`/issues?user_id=${state.userProfile.username}`)
                .then(res => {
                    // console.log("get issues by username", res.data);
                    dispatch({ type: SET_PROFILE_ISSUES, payload: res.data.sort((a, b) => b.count - a.count) });
                });
            if (state.location) {
                let dashboardRefresh2 = await axiosWithAuth()
                    .get(`/issues?location=${props.eachIssue.location}`)

                dispatch({
                    type: ADD_POST,
                    payload: dashboardRefresh2.data.sort((a, b) => b.count - a.count)
                });
            } else {
                axiosWithAuth()
                    .get("/issues")
                    .then(res => {
                        // console.log(res, "res from axios in Edit Button.js")
                        dispatch({
                            type: ADD_POST,
                            payload: res.data.sort((a, b) => b.count - a.count)
                        });
                    })
                    .catch(err => {
                        console.log(err, "error from axios EditButton.js")
                    })
            };

        };
    };

    if (voted) {
        return (
            <div>
                <StyledVoteButton className="button-like liked" onClick={voteHandler}><i class="fa fa-heart"></i>{` ${props.eachIssue.count}`} Like</StyledVoteButton>
            </div>
        )
    } else {
        return (
            <div>
                <StyledVoteButton className='button-like' onClick={voteHandler}><i class="fa fa-heart"></i>{` ${props.eachIssue.count}`} Like</StyledVoteButton>
            </div>
        )
    };

};


function MenuButton(props) {
    return (
        <BurgerButton onClick={props.onClick}>
            <Bar1></Bar1>
            <Bar2></Bar2>
            <Bar3></Bar3>
        </BurgerButton>
    );
};

function AddButton() {
    const { dispatch } = useContext(CoMakeContext);
    const displayForm = () => {
        dispatch({ type: TOGGLE_FORM });
        dispatch({ type: ALTER_LOCATION_STATE, payload: true });
    };
    return (
        <StyledSideNavButton className='styledSideNavButton' onClick={displayForm}>Add Post</StyledSideNavButton>
    )
}

const EditButton = (props) => {
    const { dispatch, state } = useContext(CoMakeContext);
    const displayForm = () => {
        dispatch({ type: TOGGLE_FORM });
        dispatch({ type: EDIT_THIS_ISSUE, payload: props.eachIssue });
    }
    const myPost = (props.eachIssue.user_id === state.userProfile.username);
    if (myPost) {
        return (
            <StyledEditButton className="button-Edit" onClick={displayForm}>Edit</StyledEditButton>
        )
    } else {
        return (
            <StyledEditButton className="hideButton" onClick={displayForm}>Edit</StyledEditButton>
        )
    };
};


function DeleteButton(props) {
    const { dispatch, state } = useContext(CoMakeContext);
    const deletePost = () => {
        dispatch({ type: TOGGLE_FORM })
        dispatch({ type: SELECT_ITEM_TO_DELETE, payload: props.eachIssue })
    }
    const myPost = (props.eachIssue.user_id === state.userProfile.username)
    if (myPost) {
        return (
            <StyledDeleteButton className="button-Delete" onClick={deletePost}>Delete</StyledDeleteButton>
        )
    } else {
        return (
            <StyledDeleteButton className="hideButton" onClick={deletePost}>Deletet</StyledDeleteButton>
        )
    }
};

function SideNavButton(props) {
    const { dispatch, state } = useContext(CoMakeContext);
    const [clicked, setClicked] = useState(false)

    const clickHandler = (e) => {
        e.preventDefault();
        dispatch({ type: ALTER_LOCATION_STATE, payload: false })
        if (props.body === "See All Issues") {
            axiosWithAuth()
                .get("/issues")
                .then(res => {
                    dispatch({ type: ADD_POST, payload: res.data.sort((a, b) => b.count - a.count) });
                })
                .catch(err => {
                    console.log("error from clicking the show all button, visit the button.js page", err);
                });
        } else if (props.body === "Sort By Votes") {
            if (!clicked) {
                setClicked(true);
                dispatch({ type: ADD_POST, payload: state.issues.sort((a, b) => a.count - b.count) });
            } else {
                setClicked(false);
                dispatch({ type: ADD_POST, payload: state.issues.sort((a, b) => b.count - a.count) });
            }
        };
    };
    return (
        <button className="styledSideNavButton" onClick={clickHandler}>{props.body}</button>
    )
}
export { MenuButton, VoteButton, AddButton, EditButton, DeleteButton, SideNavButton }
