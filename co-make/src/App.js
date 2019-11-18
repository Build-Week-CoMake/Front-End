import React, { useReducer } from 'react';
import './App.css';
import { CoMakeContext } from "./context/CoMakeContext";
import { initialState, appReducer } from "./reducers";
import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from './components/Login';
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";



function App(props) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return (
    <div>
      <CoMakeContext.Provider value={{ state, dispatch }}>
        <Route component={NavBar} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/profile" component={Profile} />
        <Modal className={(state.showForm) ? "displayForm" : "hideForm"} setVisible={setVisible} header={data.home.header_songs} body={data.home.body_songs}></Modal>
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






