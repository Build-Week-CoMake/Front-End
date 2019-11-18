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
                <StyledVoteButton onClick={voteHandler}>9 "\U+1F44D"</StyledVoteButton>
            </div>
        )
    } else {
        return (
            <div>
                <StyledVoteButton onClick={voteHandler}>8 "\U+1F44D"</StyledVoteButton>
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
    return (
        <div>

        </div>
    )
}

function AddButton() {
    return (
        <div>

        </div>
    )
}
export { LogoutButton, MenuButton, VoteButton, AddButton };