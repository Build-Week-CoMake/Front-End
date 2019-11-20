import React, { useState, useContext } from 'react';

import styled from 'styled-components';

const LogoH1 = styled.h1
    `
    background: white;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Yellowtail', cursive;
    padding: 0 2rem;
    margin: 0;
    
`




export default function LogoIcon() {

    return (

        <div>
            <LogoH1>Co-Make</LogoH1>


        </div>



    )
}