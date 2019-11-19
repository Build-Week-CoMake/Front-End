import React, { useState } from 'react';
import styled from 'styled-components';
import { VoteButton } from './Buttons';

const IssuesBox = styled.div
    ` 
border: red 1px solid; 
margin: 1rem;
display: flex;
align-items: center;


  `

const IssuesRightSide = styled.div
    `
border: red 1px solid; 
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
border: red 1px solid;
width: 8%;
margin: .3rem;
`

const ImageIcon = styled.div
    `
border: red 1px solid;
width: 8%;
margin: .3rem;
`
export default function Issues(props) {
    const [expanded, setExpanded] = useState(false)
    return (
        <IssuesBox>
            <VoteButtonStyle><VoteButton /></VoteButtonStyle>
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