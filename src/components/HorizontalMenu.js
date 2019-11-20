import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'
const ManuBar = styled.div
    `
    
    
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    
    a{
        text-decoration: none;
        color: #FFF;
        text-decoration: none;
        font-size: .6rem;
        margin: 0px 10px;
        padding: 10px 10px;
        position: relative;
        z-index: 0;
        cursor: pointer;
      }

        a:before,a:after
        {
            position: absolute;
            left: 0px;
            width: 100%;
            height: 2px;
            background: #FFF;
            content: "";
            opacity: 0;
            transition: all 0.3s;
        }

        a:before
        {
            top: 0px;
            transform: translateY(10px);
        }

        a:after
        {
            bottom: 0px;
            transform: translateY(-10px);
        }

        a:hover:before,a:hover:after
        {
            opacity: 1;
            transform: translateY(0px);
        }

        

    

    
`


export default function Menu() {
    return (
        <ManuBar >
            <NavLink to="/" >DASHBOARD</NavLink>
            <NavLink to="/profile">PROFILE</NavLink>
            <NavLink to="/login">LOGOUT</NavLink>
        </ManuBar>
    )
}
