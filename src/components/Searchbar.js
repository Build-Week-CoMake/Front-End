import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import { CoMakeContext } from '../context/CoMakeContext';
import { GET_BY_LOCATION } from '../reducers';



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






    //console.log(dispatch)
    const handleSubmit = (e) => {
        e.persist();

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
