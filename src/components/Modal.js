import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
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
        }
        label{
            width: 25%;
        }
        textarea{
            overflow: auto;
            margin: 0px;
            width: 65%;
            height: 35%;
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
        console.log("useEffect in MODAL is running")
        if (state.issueToEdit.title) {
            console.log("edit if statement useEffect is running")
            setFormData(state.issueToEdit)
        } else if (state.deleteQueue.title) {
            console.log("delete if statement in useEffect is running")
            setFormData(state.deleteQueue)
        }

    }, [state.issueToEdit, state.deleteQueue])
    console.log(state.issueToEdit.title, "is this the correct title??")
    console.log(state.issueToEdit, "is this being set before modal is called?")

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
            axiosWithAuth()
                .put(`/issues/${state.issueToEdit.id}`, formData)
                .then(res => {
                    console.log(res, "response from put request");
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
                .post("/issues", formData)
                .then(res => {
                    console.log(res, "response from POST request");
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
        axiosWithAuth()
            .delete(`/issues/${state.deleteQueue.id}`)
            .then(res => {
                console.log(res, "response from delete function");
                dispatch({ type: DELETE_POST, payload: res.data })
                dispatch({ type: TOGGLE_FORM });
            })
            .catch(err => {
                console.log(err, "error from ADD_POST function");
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
                        <input id="title" type="text" placeholder="Title of Post" value={formData.title} onChange={handleChange} />

                        <label htmlFor="picture">URL</label>
                        <input id="picture" type="text" placeholder="Image URL (Optional)" value={formData.picture} onChange={handleChange} />

                        <label htmlFor="location">Location:</label>
                        <input id="location" type="text" placeholder="ex: Boston, MA or Miami, FL" value={formData.location} onChange={handleChange} />

                        <label htmlFor="description">Description:</label>
                        <textarea id="description" type="text" placeholder="Concern details here" value={formData.description} onChange={handleChange} />

                        <button type="submit" onClick={handleAdd}>{(state.issueToEdit.title) ? "Edit Post" : "Create New Post"}</button>
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

