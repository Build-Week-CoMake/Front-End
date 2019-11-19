import Searchbar from './Searchbar'
import React, { useState, useContext } from 'react'
import styled from 'styled-components';

import Menu from "./Menu";
import { LogoutButton, MenuButton } from "./Buttons";

export default function NavBar() {

    return (
        <>
            <div className="NavBar">
                <MenuButton className='menuButton'></MenuButton>
                <Searchbar className='Searchbar'></Searchbar>
                <LogoutButton className="logoutButton"></LogoutButton>
            </div>
            <Menu className="menu" ></Menu>
        </>
    )
}
