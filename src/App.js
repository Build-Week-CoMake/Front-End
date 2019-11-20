import React, { useReducer, useEffect } from 'react';
import './App.css';
import { CoMakeContext } from "./context/CoMakeContext";
import { initialState, appReducer, INIT_HOME } from "./reducers";
import { Route } from "react-router-dom";
import axiosWithAuth from "./utils/axiosWithAuth";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from './components/Login';
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import Modal from "./components/Modal";



function App(props) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  useEffect(() => {
    if (props.match.path === "/") {
      axiosWithAuth()
        .get("/issues")
        .then(res => {
          console.log(res, "responseData")
          dispatch({ type: INIT_HOME, payload: res.data })
        })
        .catch(err => {
          console.log(err, "error from init")
        })
    }
    else if (props.match.path === "/profile") {
      // axiosWithAuth()
      //     .get("/issues")
      //     .then(res => {
      //         console.log(res, "responseData")
      //         dispatch({ type: INIT_HOME, payload: res.data })
      //     })
      //     .catch(err => {
      //         console.log(err, "error from init")
      //     })
    }

  }, [props.match.path])
  return (
    <div>
      <CoMakeContext.Provider value={{ state, dispatch }}>
        <Route component={NavBar} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/profile" component={Profile} />
        <Modal className={(state.showForm) ? "displayForm" : "hideForm"}></Modal>
      </CoMakeContext.Provider>
    </div>
  );
}
export default App;








