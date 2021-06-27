import React, { createContext, useReducer } from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import SearchJobs from './Pages/JobPost/SearchJobs';
import ApplicantLogin from './Pages/Applicant/Login';
import ApplicantRegister from './Pages/Applicant/Register';
import RecruiterLogin from './Pages/Recruiter/Login';
import RecruiterRegister from './Pages/Recruiter/Register';
import Footer from './Components/Footer';
import JobDesc from './Pages/JobPost/JobDesc';
import CreatePost from './Pages/JobPost/CreatePost';
import ApplicantApplications from './Pages/Applicant/ApplicantApplications';
import ApplicantProfile from './Pages/Applicant/ApplicantProfile';
import RecruiterProfile from './Pages/Recruiter/RecruiterProfile';
import Page404 from './Pages/404';
import MyPostings from './Pages/Recruiter/MyPostings';
import JobApplicants from './Pages/Recruiter/JobApplicants';
import { initialState, reducer } from './reducer/UseReducer';

export const UserContext = createContext();
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            {state === 'RECRUITER' ? <MyPostings /> : <Home />}
          </Route>
          <Route exact path='/search/'>
            <Redirect to='/search/jobs' />
          </Route>
          <Route exact path='/job/'>
            <Redirect to='/search/jobs' />
          </Route>
          <Route exact path='/search/jobs' component={SearchJobs} />
          <Route path='/applicant/login' component={ApplicantLogin} />
          <Route path='/applicant/register' component={ApplicantRegister} />
          <Route path='/recruiter/login' component={RecruiterLogin} />
          <Route path='/recruiter/register' component={RecruiterRegister} />
          <Route path='/create/job' component={CreatePost} />
          <Route path='/create/'>
            <Redirect to='/create/job' />
          </Route>
          <Route path='/my-applications' component={ApplicantApplications} />
          <Route path='/applicant/profile' component={ApplicantProfile} />
          <Route path='/recruiter/profile' component={RecruiterProfile} />
          <Route path='/applicants/:id' component={JobApplicants} />
          <Route path='/:view/:id' component={JobDesc} />
          <Route component={Page404} />
        </Switch>
        <Footer />
      </UserContext.Provider>
    </div>
  );
};

export default App;
