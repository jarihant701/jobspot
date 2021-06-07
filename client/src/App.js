import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import ApplicantLogin from './Pages/Applicant/Login';
import ApplicantRegister from './Pages/Applicant/Register';
import RecruiterLogin from './Pages/Recruiter/Login';
import RecruiterRegister from './Pages/Recruiter/Register';

// Custom component imports
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/applicant/login' component={ApplicantLogin} />
        <Route path='/applicant/register' component={ApplicantRegister} />
        <Route path='/recruiter/login' component={RecruiterLogin} />
        <Route path='/recruiter/register' component={RecruiterRegister} />
      </Switch>
    </>
  );
};

export default App;
