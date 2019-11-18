import React, { useContext, useState } from 'react';
import styled from "styled-components";
import { CoMakeContext } from "../context/CoMakeContext";
import { ADD_POST, TOGGLE_FORM } from "../reducers"

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
        width: 500px;
        height:500px;
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
    const { dispatch } = useContext(CoMakeContext);
    const [formData, setFormData] = useState({
        title: "",
        img: "",
        location: "",
        description: ""
    })
    const handleChange = (e) => {
        e.persist();
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch({ type: ADD_POST, payload: formData })
    };
    const handleQuit = (e) => {
        e.preventDefault();
        dispatch({ type: TOGGLE_FORM })
    };

    return (
        <ModalDiv className={props.className}>
            <main>
                <div>
                    <form>
                        <label htmlFor="title">Title:</label>
                        <input id="title" type="text" placeholder="Title of Post" value={formData.username} onChange={handleChange} />

                        <label htmlFor="img">URL</label>
                        <input id="img" type="text" placeholder="Image URL (Optional)" value={formData.password} onChange={handleChange} />

                        <label htmlFor="location">Location:</label>
                        <input id="location" type="text" placeholder="ex: Boston, MA or Miami, FL" value={formData.location} onChange={handleChange} />

                        <label htmlFor="description">Description:</label>
                        <input id="description" type="text" placeholder="Concern details here" value={formData.location} onChange={handleChange} />

                        <button type="submit" onClick={handleAdd}>Create New Post</button>
                        <button type="submit" onClick={handleQuit}>Cancel</button>
                    </form>
                </div>
                <span onClick={handleQuit}>
                    &#9421;
                </span>
            </main>
        </ModalDiv>
    );
}

