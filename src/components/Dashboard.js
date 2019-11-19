import React, { useContext } from 'react'
import { CoMakeContext } from "../context/CoMakeContext";
import { TOGGLE_FORM } from "../reducers";

import { AddButton } from "./Buttons";
import Issues from "./Issues";

export default function Dashboard() {
    const { dispatch, state } = useContext(CoMakeContext);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch({ type: TOGGLE_FORM })
    };

    return (
        <div>
            {state.issues.map((eachIssue, index) => {
                return <Issues key={index} eachIssue={eachIssue} />
            })}
            <AddButton onClick={handleClick}></AddButton>
        </div>
    )
};
