import React, { useState, useContext } from 'react'
import styled from "styled-components";
import { CoMakeContext } from "../context/CoMakeContext";
import { UP_VOTE, DOWN_VOTE } from "../reducers";

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
    height:auto;
    width:auto;
    border-radius:45px;
    background-color:#DCDCDC;
    color: black;
    margin:  0 .5rem;
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
        <BurgerButton>
            <Bar1></Bar1>
            <Bar2></Bar2>
            <Bar3></Bar3>
        </BurgerButton>
    )
}


function LogoutButton() {
    const { dispatch } = useContext(CoMakeContext);
    return (

        <StyledLogoutButton>
            Logout
        </StyledLogoutButton>
    )
}

function AddButton() {
    return (
        <StyledADDButton>&#9421;</StyledADDButton>
    )
}
export { LogoutButton, MenuButton, VoteButton, AddButton };