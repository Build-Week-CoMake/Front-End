import React, { useReducer, useContext } from 'react';
import './App.css';
import { CoMakeContext } from "./context/CoMakeContext";
import { initialState, appReducer } from "./reducers";
import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from './components/Login';
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import Modal from "./components/Modal";



function App(props) {
  let [state, dispatch] = useReducer(appReducer, initialState)
  console.log(state, "app state")


  return (
    <div>
      <CoMakeContext.Provider value={{ state, dispatch }}>
        <Route component={NavBar} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/profile" component={Profile} />
        <Modal className={(!state.showForm) ? "hideForm" : "displayForm"}></Modal>

      </CoMakeContext.Provider>

    </div>
  );

}

export default App;


// dispatch = ourActions
// state = ourGlobalState
// // WHENEVER WE NEED TO ACCESS Global Functions OR Global State
// <Route path="/login" render=(props) => {LoginPage ...props,  state={state} setState={setState}} />
// props.state props.setState






