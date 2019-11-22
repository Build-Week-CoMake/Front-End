import React, { useContext } from 'react'
import { CoMakeContext } from "../context/CoMakeContext";
import { TOGGLE_FORM } from "../reducers";
import { AddButton, SideNavButton } from "./Buttons";
import Issues from "./Issues";
import styled from 'styled-components';

const StyledDiv = styled.div`
    box-sizing:border-box;
    width:100vw;
    height:100vh;
    padding-top: 48px;
    background-color: #f2e7e6;
    display: flex;

    justify-content: space-between;
    overflow:hidden;
    .left{
        width: 15%;
        min-width: 145px;
        max-width: 200px;
        height: 100%;
        background:linear-gradient(90deg,rgba(61,96,152,1) 0%,rgba(0,212,255,1) 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        button{
            margin: 3rem 0;
        }
        
    }
    .right{
        width:85%;
        height:100%;
        display: flex;
    flex-direction: column;
    align-items: center;
    }

`;
const DivStyle = styled.div
    `
    padding-top: 2.5rem;
`

export default function Dashboard() {
    const { dispatch, state } = useContext(CoMakeContext);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch({ type: TOGGLE_FORM })
    };
    return (
        <StyledDiv>
            <section className="left">
                <SideNavButton body={"See All Issues"}>See All Issues</SideNavButton>
                <SideNavButton body={"Sort By Votes"}>See All Issues</SideNavButton>
                <AddButton onClick={handleClick}></AddButton>
            </section>
            <section className="right">
                <DivStyle>

                    {state.issues.map((eachIssue, index) => {
                        return <Issues key={index} eachIssue={eachIssue} />
                    })}
                </DivStyle>
            </section>
        </StyledDiv>
    )
};
