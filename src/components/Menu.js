import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'
const ManuBar = styled.div
    `
    height: 10rem;
    width: 30vw;
    background-color: #ffc1c1;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position:fixed;
    top:30;
    left:0;
`


export default function Menu(props) {
    const logout = () => {
        props.onClick();
        localStorage.clear("token");
    }

    return (
        <ManuBar className={props.className}>
            <NavLink onClick={props.onClick} className='navLinkStyle' to="/" >DASHBOARD</NavLink>
            <NavLink onClick={props.onClick} className='navLinkStyle' to="/profile">PROFILE</NavLink>
            <NavLink onClick={logout} className='navLinkStyle' to="/login">LOGOUT</NavLink>
        </ManuBar>
    )
}
