import React, { useState } from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../utils/axiosWithAuth';



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
// const LabelLoginPasswd = styled.label`
// position: relative;
// &::after {
//   backface-visibility: hidden;
//   color: rgba(0, 0, 0, 0.2);
//   display: block;
//   font: 400 16px 'FontAwesome', sans-serif;
//   left: 14px;
//   position: absolute;
//   top: 35%;
//   transform: translate3d(-50%, -50%, 0)
//     scale(1);
//   z-index: 1;

// `


export default function Login() {

    const [login, setLogin] = useState(true);
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const [signupData, setSignUpData] = useState({
        username: '',
        password: '',
        location: ''
    })


    const handleChangeForm1 = (e) => {
        e.persist();
        setLoginData({
            ...loginData,
            [e.target.id]: e.target.value
        })
    }

    const handleChangeForm2 = (e) => {
        e.persist();
        setSignUpData({
            ...signupData,
            [e.target.id]: e.target.value
        })
    }

    const submitForm1 = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post('/login', loginData)
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.data)
                setLoginData(({
                    username: '',
                    password: ''
                }))
            })
            .catch(error => {
                console.log(`there is a error ${error}`, error);
            }
            )
    }

    const submitForm2 = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post('/login/new', signupData)
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.data)
                setSignUpData(({
                    username: '',
                    password: '',
                    location: ''
                }))
            })
            .catch(error => {
                console.log(`there is a error ${error}`, error);
            }
            )
    }

    if (login === true) {
        return (
            <LoginBG>
                <div className="login-box">

                    <div className='Form'>
                        <form>
                            <label>
                                <input id="username" type="text" placeholder="Username" value={loginData.username} onChange={handleChangeForm1} />
                            </label>
                            <label htmlFor="passwd" className="passwd">
                                <input id="password" type="password" placeholder="Password" value={loginData.password} onChange={handleChangeForm1} />
                            </label>
                            <Button type="submit" onClick={submitForm1}>Sign In</Button>

                            <Button type="submit" onClick={() => { setLogin(!login) }}>Sign Up</Button>
                        </form>

                    </div>
                    <div className='formPic'></div>
                </div>
            </LoginBG>
        )

    } else {
        return (
            <LoginBG>
                <div className="login-box">
                    <div className='formPic'></div>
                    <div className='Form'>
                        <form>
                            <label>
                                <input id="username" type="text" placeholder="Username" value={signupData.username} onChange={handleChangeForm2} />
                            </label>
                            <label htmlFor="passwd" className="passwd" >
                                <input id="password" type="password" placeholder="Password" value={signupData.password} onChange={handleChangeForm2} />
                            </label>
                            <label htmlFor="location" className="location">
                                <input id="location" type="text" placeholder="Location" value={signupData.location} onChange={handleChangeForm2} />
                            </label>
                            <Button type="submit" onClick={submitForm2}>Sign Up</Button>
                            <Button type="submit" onClick={() => { setLogin(!login) }}>Sign In</Button>
                        </form>

                    </div>

                </div>
            </LoginBG>
        )
    }
}
