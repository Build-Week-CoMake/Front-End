import React, { useState, useContext } from 'react';
import { CoMakeContext } from "../context/CoMakeContext";
import styled from 'styled-components';
import axiosWithAuth from '../utils/axiosWithAuth';
import { INIT_HOME, UPDATE_USER_PROFILE, UP_VOTE, SET_PROFILE_ISSUES } from '../reducers';
import * as Yup from 'yup';



const LoginBG = styled.div`
padding-top: 3vh;
background: linear-gradient(90deg, rgba(61,96,152,1) 0%, rgba(0,212,255,1) 100%);
background-position: center;
background-repeat: no-repeat;
background-size: cover;
color: #0c0d1f;
height: 97vh; 
display: flex;
justify-content: center;
align-items: center;

`;



const Button = styled.button`
height: 3rem;
width: 14rem;
border: none;
border-radius: 20px;
background: linear-gradient(90deg, rgba(61,96,152,1) 0%, rgba(0,212,255,1) 100%);
font-size: 17px;
color: #fff;
font-weight: bolder;
margin: 1rem 2rem;
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

const LoginBox = styled.div`
display: flex;
align-items: center;
width: 700px;
margin: 4rem;
height: 600px;
background: white;
box-shadow: 5px 5px 30px 10px rgba(0,0,0,0.10), -5px 30px 30px 10px rgba(0,0,0,0.10);

input{

    border: none;
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    text-indent: 0px;
    text-align: start;
    -webkit-rtl-ordering: logical;
    cursor: text;
    box-sizing: border-box;
    overflow: visible;
    border-radius: 7px;
    height: 62px;
    padding: 0 20px 0 23px;
    display: block;
    background: transparent;
    font-family: SourceSansPro-Bold;
    font-size: 20px;
    margin: 1.5rem 1rem;
    background-color: white;
    box-shadow: 5px 5px 25px 10px rgba(0,0,0,0.10), -5px -5px 25px 10px rgba(0,0,0,0.10);
    

}

`

export default function Login(props) {
    const { dispatch } = useContext(CoMakeContext);
    const [login, setLogin] = useState(true);
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [signupData, setSignUpData] = useState({
        username: '',
        password: '',
        location: ''
    });


    const handleChangeForm1 = (e) => {
        e.persist();
        setLoginData({
            ...loginData,
            [e.target.id]: e.target.value
        });
    };

    const handleChangeForm2 = (e) => {
        e.persist();
        setSignUpData({
            ...signupData,
            [e.target.id]: e.target.value
        });
    };

    const getInitialData = (locationData, usernameData) => {
        let formInfo = (signupData.location) ? signupData : loginData;
        dispatch({ type: UPDATE_USER_PROFILE, payload: formInfo })
        axiosWithAuth()
            .get(`/issues?location=${locationData}`)
            .then(res => {
                console.log(res, "responseData")
                dispatch({ type: UPDATE_USER_PROFILE, payload: { location: locationData } })
                dispatch({ type: INIT_HOME, payload: res.data.sort((a, b) => b.count - a.count) })
                setLoginData({
                    username: '',
                    password: ''
                });
                setSignUpData({
                    username: '',
                    password: '',
                    location: ''
                });
                props.history.push("/")
            })
            .catch(err => {
                console.log(err, "error from init")
            });
        axiosWithAuth()
            .get("/upvote/")
            .then(res => {
                console.log("this is my voting data login.js", res)
                dispatch({ type: UP_VOTE, payload: res.data.sort((a, b) => b.count - a.count) })
            })
            .catch(err => {
                console.log(err, "error from upvote get inside of login.js")
            });
        axiosWithAuth()
            .get(`/issues?user_id=${usernameData}`)
            .then(res => {
                console.log("get issues by username", res.data);
                dispatch({ type: SET_PROFILE_ISSUES, payload: res.data.sort((a, b) => b.count - a.count) });
            })
    }
    const submitForm1 = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post('/login', loginData)
            .then(res => {
                localStorage.setItem("token", res.data.token)
                getInitialData(res.data.location, res.data.username)
            })
            .catch(error => {
                console.log(`there is a error ${error}`, error);
            });
    }

    const submitForm2 = async (e) => {
        e.preventDefault();
        let isValid = await schema.isValid(
            signupData
        )
        if (!isValid) {
            alert('input is not valid')
            return

        }

        axiosWithAuth()
            .post('/login/new', { ...signupData, location: signupData.location.toLowerCase() })
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.data.token)
                getInitialData(res.data.location, res.data.username);
            })
            .catch(error => {
                console.log(`there is a error ${error}`, error);
            })
    }



    if (login === true) {
        return (
            <LoginBG>
                <LoginBox>

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
                </LoginBox>
            </LoginBG>
        )

    } else {
        return (
            <LoginBG>
                <LoginBox>
                    <div className='signUpformPic'></div>
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

                </LoginBox>
            </LoginBG>
        )
    }
}


let schema = Yup.object().shape({
    username: Yup.string().lowercase().min(4),
    password: Yup.string().required('Password is required')

});


