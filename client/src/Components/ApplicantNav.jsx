import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from '../App';

const ApplicantNav = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();

  const logout = async () => {
    const res = await fetch('/api/logout');
    const data = await res.json();
    alert(data.message);
    if (res.status === 200) {
      dispatch({ type: 'APPLICANT', payload: 'NONE' });
      history.push('/');
    }
  };

  return (
    <Nav>
      <Nav.Link as={Link} to='/'>
        Home
      </Nav.Link>
      <Nav.Link as={Link} to='/search/jobs'>
        Jobs
      </Nav.Link>
      <NavDropdown title='Profile' id='basic-nav-dropdown'>
        <NavDropdown.Item as={Link} to='/applicant/profile'>
          View My Profile
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to='/my-applications'>
          My Applications
        </NavDropdown.Item>
      </NavDropdown>
      <Nav.Link onClick={logout}>Logout</Nav.Link>
    </Nav>
  );
};

export default ApplicantNav;
