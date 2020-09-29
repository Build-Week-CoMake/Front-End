import Searchbar from './Searchbar'
import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import Menu from "./Menu";
import { LogoutButton, MenuButton } from "./Buttons";
import HorizontalMenu from './HorizontalMenu';
import LogoIcon from './logoIcon';

const NavBarStyle = styled.div
    `
position: fixed;

top: 0px;
margin: .01rem;
width: 100vw;
z-index: 5;
min-height: 3rem;
display: flex;
align-items: center;
justify-content: space-between;
background-color: #FAACA8;
background: linear-gradient(90deg, rgba(61,96,152,1) 0%, rgba(0,212,255,1) 100%);

`


export default function NavBar() {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <div>
            <NavBarStyle>
                {/* <MenuButton className='menuButton' onClick={() => { setShowMenu(!showMenu) }} ></MenuButton> */}
                {/* <Searchbar className='Searchbar'></Searchbar> */}
                <LogoIcon />
                <HorizontalMenu />
            </NavBarStyle>

            {/* <Menu className={(showMenu) ? "menu showMenu" : "menu"} onClick={() => { setShowMenu(!showMenu) }}  ></Menu> */}
        </div>
    )
}
