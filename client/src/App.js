import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import ApplicantLogin from './Pages/Applicant/Login';
import ApplicantRegister from './Pages/Applicant/Register';

// Custom component imports
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/applicant/login' component={ApplicantLogin} />
        <Route path='/applicant/register' component={ApplicantRegister} />
      </Switch>
    </>
  );
};

export default App;
