import Searchbar from './Searchbar'
import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import Menu from "./Menu";
import { LogoutButton, MenuButton } from "./Buttons";
import HorizontalMenu from './HorizontalMenu';
const NavBarStyle = styled.div
    `

margin: .01rem;
width: 100vw;
min-height: 3rem;
display: flex;
align-items: center;
background-color: #FAACA8;
background-image: linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%);

`


export default function NavBar() {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <>
            <NavBarStyle>
                {/* <MenuButton className='menuButton' onClick={() => { setShowMenu(!showMenu) }} ></MenuButton> */}
                {/* <Searchbar className='Searchbar'></Searchbar> */}
                <HorizontalMenu />
            </NavBarStyle>

            {/* <Menu className={(showMenu) ? "menu showMenu" : "menu"} onClick={() => { setShowMenu(!showMenu) }}  ></Menu> */}
        </>
    )
}
