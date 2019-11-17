import React, { useReducer } from 'react';
import './App.css';
import CoMakeContext from "./context/CoMakeContext";
import { initialState, appReducer } from "./reducers";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from './components/Login';
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";


function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return (
    <div>
      <CoMakeContext value={state, dispatch}>
        <LoginPage />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/profile" component={Profile} />
      </CoMakeContext>
    </div>
  );
}

export default App;




