import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import styled from "styled-components";

const ModalDiv = styled.div`
    position: fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background-color: #0000009c;
    box-sizing:border-box;
    display:flex;
    justify-content:center;
    align-items:center;
    main{
        width: 400px;
        height:400px;
        border: 2px solid #000;
        border-radius:10px;
        background: snow;
        padding:2%;
        display:flex;
        align-items:flex-start;
        justify-content:space-between
        div{
            padding-left:20px;
            display:flex;
            flex-direction:column;
            width:85%;
            overflow:auto;
        }
    }


`;

export default function Modal(props) {
    const handleClose = () => {
        props.setVisible(false);
    };

    return (
        <ModalDiv className={props.className}>
            <main>
                <div>
                    <h2>{props.header}</h2>
                    <p>{props.body}</p>
                </div>
                <span onClick={handleClose}>
                    <CloseIcon></CloseIcon>
                </span>
            </main>
        </ModalDiv>
    );
}

