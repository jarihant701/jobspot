import React from 'react';
import logo from '../assets/images/logo_white.png';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navigation = () => {
  return (
    <div>
      <Navbar bg='primary' variant='dark' expand='sm' className='px-5'>
        <Navbar.Brand as={Link} to='/'>
          <img src={logo} alt='Logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <div className='m-auto'></div>
          <Nav>
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
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
