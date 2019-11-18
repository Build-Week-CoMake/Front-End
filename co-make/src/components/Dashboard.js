import React, { useContext } from 'react'
import { CoMakeContext } from "../context/CoMakeContext";
import { TOGGLE_FORM } from "../reducers";

import { AddButton } from "./Buttons";
import Issues from "./Issues";

export default function Dashboard() {
    const { dispatch } = useContext(CoMakeContext);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch({ type: TOGGLE_FORM })
    };

    return (
        <div>
            <Issues></Issues>
            <AddButton onClick={handleClick}></AddButton>
        </div>
    )
};
