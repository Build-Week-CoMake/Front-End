import React, { useContext } from 'react'
import { CoMakeContext } from "../context/CoMakeContext";
import { TOGGLE_FORM } from "../reducers";
import { AddButton } from "./Buttons";
import Issues from "./Issues";
import styled from 'styled-components';


const DivStyle = styled.div
    `
    padding-top: 3rem;
`

export default function Dashboard() {
    const { dispatch, state } = useContext(CoMakeContext);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch({ type: TOGGLE_FORM })
    };

    return (
        <DivStyle>
            {state.issues.map((eachIssue, index) => {
                return <Issues key={index} eachIssue={eachIssue} />
            })}
            <AddButton onClick={handleClick}></AddButton>
        </DivStyle>
    )
};
