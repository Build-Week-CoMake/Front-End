import React, { useState } from 'react';
import styled from 'styled-components';
import { VoteButton } from './Buttons';

const IssuesBox = styled.div
    ` 
border: red 1px dashed; 
margin: 1rem;
display: flex;
  `

const IssuesRightSide = styled.div
    `
border: red 1px dashed; 
margin: 1rem;
display: flex;
flex-direction: column;
width: 80%;
`

export default function Issues() {
    return (
        <IssuesBox>
            <VoteButton />
            <div>image Icon</div>
            <IssuesRightSide>
                <div className='top'>
                    <div className='title'>New street light needed for 30th Av</div>
                    <div className='location'>New York</div>
                </div>
                <div className='discribtion'>Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum</div>
                <div className='GaryOut'></div>
            </IssuesRightSide>
        </IssuesBox>

    )
}