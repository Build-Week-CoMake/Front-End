import Searchbar from './Searchbar'
import React, { useState, useContext } from 'react'
import styled from 'styled-components';

import Searchbar from "./Searchbar";
import Menu from "./Menu";
import { LogoutButton, MenuButton } from "./Buttons";

export default function NavBar() {

    return (
        <div>
            <MenuButton></MenuButton>
            <Searchbar></Searchbar>
            <LogoutButton></LogoutButton>
            <Menu></Menu>

        </div>
    )
}
