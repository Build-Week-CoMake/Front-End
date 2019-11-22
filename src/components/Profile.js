import React, { useContext } from 'react'
import styled from 'styled-components';
import { CoMakeContext } from "../context/CoMakeContext";
import Issues from "./Issues";
const ProfilePage = styled.div`
    min-height:100vh;
    padding-top: 3rem;   
    display: flex;
    flex-direction: column;

    align-items: center;

    background: linear-gradient(90deg, #91fbbf 35%, #8be2db 100%);
`;

const BoxStyle = styled.div`
    width: 95%;
    min-height: 10rem;
    max-height: 15rem;
    overflow: auto;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items:center;
    background: white;
    border-radius:1rem;
    padding-top: 1rem;
    .issues-container{
        width:95%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }


`;

const EditBoxStyle = styled.div`
width: 95%;
max-height: 25rem;

margin: 1rem;
border-radius:1rem;
display: flex;
flex-direction: column;
align-items: center;
justify-content:space-around;
color:#213159;
background: #213159;
h1{
    background: linear-gradient(90deg, #91fbbf 35%, #8be2db 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    width:95%;
    text-align:center;
}
.user-info{
    width:100%;
    display:flex;
    justify-content:space-around;
    align-items:center;
    text-align:center;
    margin-bottom: 3%;
    div{
        border-radius: 1rem;
        padding: 2% 0;
        background-color: white;
        text-align: center;
        width: 29%;
    }
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
                <h1>Welcome, {state.userProfile.username}.</h1>
                <div className="user-info">
                    <div>Username: {state.userProfile.username}</div>
                    <div>Default Location: {state.userProfile.location}</div>
                    <div>Password: {password()}</div>
                </div>
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

