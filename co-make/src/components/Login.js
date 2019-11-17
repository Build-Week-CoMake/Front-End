import React, { useState } from 'react'
import styled from 'styled-components'


const LoginBG = styled.div`

background-image: url(https://static.pexels.com/photos/4827/nature-forest-trees-fog.jpeg);
background-position: center;
background-repeat: no-repeat;
background-size: cover;
color: #0c0d1f;
height: 100vh; 
display: flex;
justify-content: center;
align-items: center;

`;

const Button = styled.button`
height: 40px;
width: 180px;
border: none;
border-radius: 20px;
background: linear-gradient(to left, #ab68ca, #de67a3); 
color: #fff;
font-weight: bolder;
margin-top: 30px;
cursor: pointer;
outline: none;
`
const Label_login_Passwd = styled.label`
position: relative;
&::after {
  backface-visibility: hidden;
  color: rgba(0, 0, 0, 0.2);
  display: block;
  font: 400 16px 'FontAwesome', sans-serif;
  left: 14px;
  position: absolute;
  top: 35%;
  transform:
    translate3d(-50%, -50%, 0)
    scale(1);
  z-index: 1;

`


export default function Login() {

    const [login, setLogin] = useState(true);
    const [loginData, setLoginData] = useState({
        userName: '',
        passWord: ''
    })

    const [SignupData, setSignUpData] = useState({
        userName: '',
        passWord: '',
        location: ''
    })

    if (login === true) {
        return (
            <LoginBG>
                <div className="login-box">
                    <form action="" method="POST" >
                        <Label_login_Passwd>
                            <input id="login" type="text" placeholder="Username" />
                        </Label_login_Passwd>
                        <Label_login_Passwd htmlFor="passwd" className="passwd">
                            <input id="passwd" type="password" placeholder="Password" />
                        </Label_login_Passwd>
                        <Button type="submit">Sign In</Button>
                    </form>
                </div>
            </LoginBG>
        )

    }
}
