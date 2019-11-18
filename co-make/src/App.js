import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/Login';
import Issues from './components/Issues';
function App() {
  return (
    <div>
      <Route exact path='/' render={props => <Issues {...props} />} />
      <Route exact path='/LoginPage' render={props => <LoginPage {...props} />} />
    </div>
  );
}

export default App;




