import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const RecruiterNav = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();

  const logout = async () => {
    const res = await fetch('/api/logout');
    const data = await res.json();
    alert(data.message);
    if (res.status === 200) {
      dispatch({ type: 'RECRUITER', payload: 'NONE' });
      history.push('/');
    }
  };
  return (
    <Nav>
      <Nav.Link as={Link} to='/'>
        My Postings
      </Nav.Link>
      <Nav.Link as={Link} to='/create/job'>
        Create New
      </Nav.Link>
      <Nav.Link as={Link} to='/recruiter/profile'>
        My Profile
      </Nav.Link>
      <Nav.Link onClick={logout}>Logout</Nav.Link>
    </Nav>
  );
};

export default RecruiterNav;
