import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import { CoMakeContext } from '../context/CoMakeContext';
import { GET_BY_LOCATION, ALTER_LOCATION_STATE } from '../reducers';
import axiosWithAuth from "../utils/axiosWithAuth";



const FormStyle = styled.form
    `
width: 100%;
display: none;
animation: appear 2s;
animation-iteration-count: 1;
animation-fill-mode: forwards;
opacity: 0;


input {
    
    font-size: .8rem;
    color: #fff;
    transition: all .3s;
  }  

  input:focus{
    outline: none;
  }
  
  input::-webkit-input-placeholder {
    color: #fff;
  }

  input{
    background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  -webkit-appearance: none;
}

`




export default function Searchbar(props) {
    const { dispatch } = useContext(CoMakeContext);
    const [searchResult, setSearchResult] = useState('')

    const handleChangeSearch = (e) => {
        e.persist();
        setSearchResult(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.persist();
        dispatch({ type: ALTER_LOCATION_STATE, payload: true });
        axiosWithAuth()
            .get(`/issues/?location=${searchResult.toLowerCase()}`)
            .then(res => {
                console.log(res, "response from searchbar");
                dispatch({ type: GET_BY_LOCATION, payload: res.data.sort((a, b) => b.count - a.count) })

            })
            .catch(err => {
                console.log(err, "error from searchbar")
            })

        // if (e.key === "Enter") {



        //     e.preventDefault(e)
        //     console.log(e.cancelable)
        //     dispatch({ type: GET_BY_LOCATION, payload: searchResult })

        // }
    }
    return (

        <FormStyle onSubmit={handleSubmit} className={props.className}>
            <input id="search" type='text' placeholder='Search' value={searchResult} onChange={handleChangeSearch} />
        </FormStyle>
    )
}
