import React, { useState, useContext } from 'react';
import { CoMakeContext } from "../context/CoMakeContext";
import styled from 'styled-components';
import { VoteButton, DeleteButton, EditButton } from './Buttons';

const IssuesBox = styled.div
    ` 

margin: 3rem;
display: flex;
align-items: center;
background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
margin: 2rem;
border-radius: 25px;
box-shadow: 5px 5px 10px 3px rgba(0,0,0,0.10), -5px -5px 10px 3px rgba(0,0,0,0.10);
cursor: pointer;
transition: 0.4s;

  `

const IssuesRightSide = styled.div
    `

margin: .5rem;
display: flex;
flex-direction: column;
width: 80%;
`

const Top = styled.div
    `
display: flex;
justify-content: space-between;
margin: .3rem;
`

const Description = styled.div
    `margin: .3rem
    max-height:50px;
    overflow: hidden;
    background: linear-gradient(0deg, rgba(2,0,36,.5) 0%, rgba(217,217,235,0) 26%); 
`;

const VoteButtonStyle = styled.div
    `
width: 8%;
margin: .3rem;
`

const ImageIcon = styled.div
    `

width: 8%;
margin: .3rem;
`
export default function Issues(props) {
    const [expanded, setExpanded] = useState(false)
    const { state } = useContext(CoMakeContext)
    let didVote = true;
    console.log(state.voteProfile, "ABOVE 57")
    if (state.voteProfile.filter(eachObj => eachObj.issue_id === props.eachIssue.id).length > 0) {
        didVote = true;
        console.log("did vote true for", props.eachIssue, "and the username ===", state.userProfile.username)
    } else {
        didVote = false;
        console.log("did vote false for", props.eachIssue, "and the username ===", state.userProfile.username)
    }
    return (
        <IssuesBox>
            <VoteButtonStyle>
                <VoteButton eachIssue={props.eachIssue} didVote={didVote} />
                <EditButton eachIssue={props.eachIssue} />
                <DeleteButton eachIssue={props.eachIssue} />
            </VoteButtonStyle>
            <ImageIcon>image Icon</ImageIcon>
            <IssuesRightSide>
                <Top>
                    <div className='title'>{props.eachIssue.title}</div>
                    <div className='location'>{props.eachIssue.location}</div>
                </Top>
                <Description className={(expanded) ? "expandDescription" : "null"} onClick={() => { setExpanded(!expanded) }}>
                    <p>
                        {props.eachIssue.description}
                    </p>
                </Description>
                <div className='GaryOut'></div>
            </IssuesRightSide>
        </IssuesBox>

    )
}