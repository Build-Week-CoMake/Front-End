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
background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);

`

const BoxStyle = styled.div`
width: 95%;
min-height: 10rem;
margin: 1rem;
display: flex;
flex-direction: column;
align-items:center;
background: white;
padding-top: 1rem;


`;

const EditBoxStyle = styled.div`
width: 95%;
max-height: 10rem;

margin: 1rem;
display: flex;
flex-direction: column;
justify-content: space-around;
background: white;
div{
    padding: 1rem;
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
                <div>Username :{state.userProfile.userName}</div>
                <div>Default Location:{state.userProfile.location}</div>
                <div>Password: {password()}</div>
            </EditBoxStyle>
            <BoxStyle>
                <div >All Created Posts</div>
                <div>
                    {
                        state.profileIssues.map((eachIssue, index) => {
                            return <Issues key={index} eachIssue={eachIssue} />
                        })
                    }
                </div>
            </BoxStyle>
            <BoxStyle>
                <div className="title">All Voted On</div>
                <div>
                    {
                        state.profileIssues.map((eachIssue, index) => {
                            return <Issues key={index} eachIssue={eachIssue} />
                        })
                    }
                </div>
            </BoxStyle>
        </ProfilePage>
    )
}
