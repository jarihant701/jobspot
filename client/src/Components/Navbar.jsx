import React, { useContext } from 'react';
import logo from '../assets/images/logo_white.png';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ApplicantNav from './ApplicantNav';
import RecruiterNav from './RecruiterNav';
import { UserContext } from '../App';

const Navigation = () => {
  const { state } = useContext(UserContext);

  const DisplayNav = () => {
    if (state === 'APPLICANT') return <ApplicantNav />;
    else if (state === 'RECRUITER') return <RecruiterNav />;
    else if (state === 'NONE') {
      return (
        <Nav>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to='/search/jobs'>
            Jobs
          </Nav.Link>
          <NavDropdown title='Job Seeker' id='basic-nav-dropdown'>
            <NavDropdown.Item as={Link} to='/applicant/login'>
              Login
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/applicant/register'>
              Register
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Recruiter' id='basic-nav-dropdown'>
            <NavDropdown.Item as={Link} to='/recruiter/login'>
              Login
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/recruiter/register'>
              Register
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    }
  };

  return (
    <div>
      <Navbar bg='primary' variant='dark' expand='sm' className='px-5'>
        <Navbar.Brand as={Link} to='/'>
          <img src={logo} alt='Logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <div className='m-auto'></div>
          <DisplayNav />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
