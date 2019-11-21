import React, { useState, useContext } from 'react'
import styled from "styled-components";
import { CoMakeContext } from "../context/CoMakeContext";
import { UP_VOTE, DOWN_VOTE, TOGGLE_FORM, SELECT_ITEM_TO_DELETE, EDIT_THIS_ISSUE, ADD_POST } from "../reducers";
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
                type: "DOWN_VOTE",
                payload: data.data
            })
        } else {
            let data = await axiosWithAuth()
                .post(`/upvote/${props.eachIssue.id}`)
            dispatch({
                type: "UP_VOTE",
                payload: data.data
            })
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
        dispatch({ type: TOGGLE_FORM })
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
                alert("11111false => to true");
                setClicked(true);
                dispatch({ type: ADD_POST, payload: state.issues.sort((a, b) => a.count - b.count) });
            } else {
                alert("true => to false");
                setClicked(false);
                dispatch({ type: ADD_POST, payload: state.issues.sort((a, b) => b.count - a.count) });
            }
        };
    };
    return (
<<<<<<< HEAD
        <StyledSideNavButton onClick={clickHandler}>{props.body}</StyledSideNavButton>
    );
=======
        <button className="styledSideNavButton" onClick={clickHandler}>{props.body}</button>
    )
>>>>>>> e9969b4054f15a9ac7a7fd5866569d24c029cb86
}
export { MenuButton, VoteButton, AddButton, EditButton, DeleteButton, SideNavButton }
