import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import { CoMakeContext } from '../context/CoMakeContext';
import { GET_BY_LOCATION } from '../reducers';
import axiosWithAuth from "../utils/axiosWithAuth";



const FormStyle = styled.form
    `
width: 50%;
`


export default function Searchbar() {
    const { dispatch } = useContext(CoMakeContext);
    const [searchResult, setSearchResult] = useState('')

    const handleChangeSearch = (e) => {
        e.persist();
        setSearchResult(e.target.value);
    }

    const handleSubmit = (e) => {
        e.persist();
        axiosWithAuth()
            .get(`/issues/?location=${searchResult}`)
            .then(res => {
                console.log(res, "response from searchbar");
                dispatch({ type: GET_BY_LOCATION, payload: res.data })

            })
            .catch(err => {
                console.log(err, "error from searchbar")
            })

        if (e.key === "Enter") {



            e.preventDefault(e)
            console.log(e.cancelable)
            dispatch({ type: GET_BY_LOCATION, payload: searchResult })

        }
    }
    return (

        <FormStyle  >
            <input id="search" type='text' placeholder='&#128269; Search' value={searchResult} onChange={handleChangeSearch} onKeyPress={handleSubmit} />

        </FormStyle>
    )
}
