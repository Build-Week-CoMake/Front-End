import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import { CoMakeContext } from "../context/CoMakeContext";
import { ADD_POST, TOGGLE_FORM, RESET_ISSUE_TO_EDIT, UNSELECT_ITEM_TO_DELETE, DELETE_POST } from "../reducers"
import axiosWithAuth from "../utils/axiosWithAuth";

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
        width: 600px;
        height:600px;
        
        border-radius:7px;
        background: snow;
        padding:2%;
        display:flex;
        align-items:flex-start;
        justify-content: center;
        background: white;
        box-shadow: 5px 5px 30px 10px rgba(0,0,0,0.10), -5px 30px 30px 10px rgba(0,0,0,0.10);



        div{
            padding-left:20px;
            display:flex;
            flex-direction:column;
            width:85%;
            height:100%
            overflow:auto;
        }
    }
    form{
        width: 100%;
        height: 100%;
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        input{
            width:65%;
            border: none;
            -webkit-writing-mode: horizontal-tb !important;
            text-rendering: auto;
            text-indent: 0px;
            text-align: start;
            -webkit-rtl-ordering: logical;
            cursor: text;
            box-sizing: border-box;
            overflow: visible;
            border-radius: 7px;
            height: 62px;
            padding: 0 20px 0 23px;
            display: block;
            background: transparent;
            font-family: SourceSansPro-Bold;
            font-size: 16px;
            margin: 1.5rem 1rem;
            background-color: white;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);

           

            }


            button{
                height: 3rem;
                width: 14rem;
                border: none;
                border-radius: 20px;
                background: linear-gradient(90deg, rgba(61,96,152,1) 0%, rgba(0,212,255,1) 100%);

                color: #fff;
                font-weight: bolder;
                margin: 1rem 2rem;
                cursor: pointer;
                outline: none;

        }
        label{
            width: 25%;
        }
        textarea{
            overflow: auto;
            margin: 0px;
            width: 65%;
            height: 35%;
            border: none;
            -webkit-writing-mode: horizontal-tb !important;
            text-rendering: auto;
            text-indent: 0px;
            text-align: start;
            -webkit-rtl-ordering: logical;
            cursor: text;
            box-sizing: border-box;
            overflow: visible;
            border-radius: 7px;
            height: 62px;
            padding: 0 20px 0 23px;
            display: block;
            background: transparent;
            font-family: SourceSansPro-Bold;
            font-size: 16px;
            margin: 1.5rem 1rem;
            background-color: white;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);
        }
    }
`;
const ModalDivDelete = styled.div`
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
        width: 300px;
        height:300px;
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
            height:100%
            overflow:auto;
        }
    }
    button{
        height: 3rem;
        width: 14rem;
        border: none;
        border-radius: 20px;
        background: linear-gradient(90deg, rgba(61,96,152,1) 0%, rgba(0,212,255,1) 100%);

        color: #fff;
        font-weight: bolder;
        margin: 1rem 2rem;
        cursor: pointer;
        outline: none;

}
`;

export default function Modal(props) {
    const { dispatch, state } = useContext(CoMakeContext);
    const [formData, setFormData] = useState((state.issueToEdit.title) ? state.issueToEdit : {
        title: "",
        picture: "",
        location: "",
        description: ""
    })

    useEffect(() => {
        if (state.issueToEdit.title) {
            setFormData(state.issueToEdit)
        } else if (state.deleteQueue.title) {
            setFormData(state.deleteQueue)
        }

    }, [state.issueToEdit, state.deleteQueue])

    const handleChange = (e) => {
        e.persist();
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleAdd = (e) => {
        e.preventDefault();
        if (state.issueToEdit.title) {
            let { title, picture, location, description } = formData
            location = location.toLowerCase();
            axiosWithAuth()
                .put(`/issues/${state.issueToEdit.id}`, { title, picture, location, description })
                .then(res => {
                    setFormData({
                        title: "",
                        picture: "",
                        location: "",
                        description: ""
                    });
                    dispatch({ type: ADD_POST, payload: res.data })
                })
                .catch(err => {
                    console.log(err, "error from put request");
                });
        } else {
            axiosWithAuth()
                .post("/issues", { ...formData, location: formData.location.toLowerCase() })
                .then(res => {
                    setFormData({
                        title: "",
                        picture: "",
                        location: "",
                        description: ""
                    });
                    dispatch({ type: ADD_POST, payload: res.data })
                })
                .catch(err => {
                    console.log(err, "error from POST request");
                });
        }
    };
    const handleQuit = (e) => {
        e.preventDefault();
        setFormData({
            title: "",
            picture: "",
            location: "",
            description: ""
        });
        dispatch({ type: TOGGLE_FORM });
        dispatch({ type: RESET_ISSUE_TO_EDIT });
        dispatch({ type: UNSELECT_ITEM_TO_DELETE });
    };
    const handleDelete = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        axios
            .delete(`https://backend-buildweek.herokuapp.com/issues/${state.deleteQueue.id}`, {
                headers: {
                    auth: token,
                    location: state.deleteQueue.location.toLowerCase()
                }
            })
            .then(res => {
                dispatch({ type: DELETE_POST, payload: res.data })
                dispatch({ type: TOGGLE_FORM });
            })
            .catch(err => {
                console.log(err, "error from delete function");
            });
    }

    if (state.deleteQueue.title) {
        return (<ModalDivDelete className={props.className}>
            <main>
                <div>
                    <h3>Are you sure you sure you want to permanently delete this post?</h3>
                    <button onClick={handleDelete}>Delete Post</button>
                    <button onClick={handleQuit}>Cancel</button>
                </div>
                <span onClick={handleQuit}>
                    &#9421;
                </span>
            </main>
        </ModalDivDelete>
        )
    }
    return (
        <ModalDiv className={props.className}>
            <main>
                <div>
                    <form>
                        <label htmlFor="title">Title:</label>
                        <input spellCheck="true" id="title" type="text" placeholder="Title of Post" value={formData.title} onChange={handleChange} />

                        <label htmlFor="picture">URL:</label>
                        <input spellCheck="true" id="picture" type="text" placeholder="Image URL (Optional)" value={formData.picture} onChange={handleChange} />

                        <label htmlFor="location">Location:</label>
                        <input spellCheck="true" id="location" type="text" placeholder="ex: Boston, MA or Miami, FL" value={formData.location} onChange={handleChange} />

                        <label htmlFor="description">Description:</label>
                        <textarea spellCheck="true" id="description" type="text" placeholder="Concern details here" value={formData.description} onChange={handleChange} />

                        <button type="submit" onClick={handleAdd}>{(state.issueToEdit.title) ? "Edit Post" : "Create New Post"}</button>
                        <button type="submit" onClick={handleQuit}>Cancel</button>
                    </form>
                </div>
                {/* <span onClick={handleQuit}>
                    &#9421;
                </span> */}
            </main>
        </ModalDiv>
    );
}

