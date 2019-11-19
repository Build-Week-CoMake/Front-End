import Searchbar from './Searchbar'
import React, { useState, useContext } from 'react'
import styled from 'styled-components';

import Menu from "./Menu";
import { LogoutButton, MenuButton } from "./Buttons";

export default function NavBar() {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <>
            <div className="NavBar">
                <MenuButton className='menuButton' onClick={() => { setShowMenu(!showMenu) }} ></MenuButton>
                <Searchbar className='Searchbar'></Searchbar>

            </div>
            <Menu className={(showMenu) ? "menu showMenu" : "menu"} onClick={() => { setShowMenu(!showMenu) }}  ></Menu>
        </>
    )
}
