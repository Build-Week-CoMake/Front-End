import React, { useState, useContext } from 'react'
import styled from "styled-components";
import { CoMakeContext } from "../context/CoMakeContext";
import { UP_VOTE, DOWN_VOTE, TOGGLE_FORM } from "../reducers";

const StyledVoteButton = styled.button`
    height:20px;
    width:35px;
    border-radius:45px;
    background-color:#DCDCDC;
    color: black;
`;
const StyledADDButton = styled.button`
    height:35px;
    width:35px;
    border-radius:45px;
    background-color:#39b128;
    color: black;
`;
const StyledLogoutButton = styled.button`
    height:20px;
    width:50px;
    border-radius:45px;
    background-color:#DCDCDC;
    color: black;
`;
function VoteButton(props) {
    const [voted, setVoted] = useState((props.didVote) ? true : false)
    const { dispatch } = useContext(CoMakeContext);
    const voteHandler = (e) => {
        e.preventDefault();
        if (voted) {
            dispatch({ type: DOWN_VOTE, payload: props.id })
        } else {
            dispatch({ type: UP_VOTE, payload: props.id })
        }
        setVoted(!setVoted);
    }

    if (voted) {
        return (
            <div>
                <StyledVoteButton onClick={voteHandler}>&#128077;</StyledVoteButton>
            </div>
        )
    } else {
        return (
            <div>
                <StyledVoteButton onClick={voteHandler}>&#128077;</StyledVoteButton>
            </div>
        )
    }

}


function MenuButton() {
    return (
        <div>

        </div>
    )
}


function LogoutButton() {
    const { dispatch } = useContext(CoMakeContext);
    return (

        <StyledLogoutButton>Logout;</StyledLogoutButton>
    )
}

function AddButton() {
    const { dispatch } = useContext(CoMakeContext);
    const displayForm = () => {
        dispatch({ type: TOGGLE_FORM })
    }
    return (
        <StyledADDButton onClick={displayForm}>&#8853;</StyledADDButton>
    )
}
export { LogoutButton, MenuButton, VoteButton, AddButton };