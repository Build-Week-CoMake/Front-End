import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'
import Searchbar from './Searchbar'
const ManuBar = styled.div
    `
    
    
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    margin-top: 0;
    
    a{
        text-decoration: none;
        color: #FFF;
        
        font-size: .6rem;
        margin: 0px 10px;
        padding: 10px 10px;
        position: relative;
        z-index: 0;
        cursor: pointer;
      }

        a:before,a:after
        {
            position:absolute;
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

        ul{
            
            list-style-type: none;
            
            padding: 0;
            margin: 0;
            transition: all .3s;
            
            display: flex;
            align-items: center;
            align-content: space-between;
          }

          li{
            display: flex;
            align-items: center;
            align-content: center;
          }

`


const SearchButton = styled.div
    `
width: 40%;

color: #fff;
font-size: 1rem;
transition: .3s;
padding: 0 0 0 1.5rem;

&::before{
    content: '';
  }
  
  &:hover{
    transform: scale(1.5);
  }

  

`

export default function Menu() {

    const [showSearch, setshowSearch] = useState(false)

    return (
        <ManuBar >
            <ul>
                <li><a href="https://co-make-marketing.netlify.com">Home</a></li>
                <li><NavLink to="/" >Dashboard</NavLink></li>
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><NavLink onClick={() => { localStorage.clear("token") }} to="/login">Logout</NavLink></li>
            </ul>
            <Searchbar className={(showSearch) ? "searchBar showSearchBar" : "searchBar"} />
            <SearchButton
                className="animated bounce slow delay-1s"
                onClick={() => {
                    setshowSearch(!showSearch)
                    console.log('clicked')
                    console.log({ showSearch })
                }}>
                <i className="fa fa-search"></i>
            </SearchButton>
        </ManuBar>
    )
}
