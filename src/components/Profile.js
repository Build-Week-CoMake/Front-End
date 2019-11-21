import React, { useContext } from 'react'
import styled from 'styled-components';
import { CoMakeContext } from "../context/CoMakeContext";
import Issues from "./Issues";
const ProfilePage = styled.div
    `
    padding-top: 3rem;   
display: flex;
flex-direction: column;

align-items: center;
background: linear-gradient(90deg, #91fbbf 35%, #8be2db 100%);

`

const BoxStyle = styled.div`
width: 95%;
min-height: 10rem;
margin: 1rem;
display: flex;
flex-direction: column;
align-items:center;
background: white;
border-radius:1rem;
padding-top: 1rem;
.issues-container{
    width:95%;
}


`;

const EditBoxStyle = styled.div`
width: 80%;
max-height: 25rem;

margin: 1rem;
border-radius:1rem;
display: flex;
flex-direction: column;
align-items: flex-end;
color:#213159;
background: #213159;
div{
    border-radius:1rem;
    background-color:white;
    margin: .5rem;
    text-align:center;
    padding:1rem;
    width:40%;
}
`;

export default function Profile() {
    const { dispatch, state } = useContext(CoMakeContext);
    const password = () => {
        let stars = '';
        for (let i = 0; i < state.userProfile.password.length; i++) {
            stars += "*"
        }
        return stars;
    };

    return (
        <ProfilePage>
            <EditBoxStyle>
                <div>Username: {state.userProfile.username}</div>
                <div>Default Location: {state.userProfile.location}</div>
                <div>Password: {password()}</div>
            </EditBoxStyle>
            <BoxStyle>
                <div >All Created Posts</div>
                <div className="issues-container">
                    {
                        state.profileIssues.map((eachIssue, index) => {
                            return <Issues key={index} eachIssue={eachIssue} />
                        })
                    }
                </div>
            </BoxStyle>
            <BoxStyle>
                <div className="title">All Voted On</div>
                <div className="issues-container">
                    {
                        state.voteProfile.map((eachIssue, index) => {
                            return <Issues key={index} eachIssue={eachIssue} />
                        })
                    }
                </div>
            </BoxStyle>
        </ProfilePage>
    )
}

