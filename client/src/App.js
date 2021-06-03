import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './assets/css/App.min.css';
import Applicant from './Pages/LoginRegisterApplicant';
import Recruiter from './Pages/LoginRegisterRecruiter';

//Importing components
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/applicant' component={Applicant} />
        <Route path='/recruiter' component={Recruiter} />
      </Switch>
    </>
  );
};

export default App;
