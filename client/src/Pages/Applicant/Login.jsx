import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../App';

const Login = () => {
  const { dispatch } = useContext(UserContext);

  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const { email, password } = input;

    //Validating Form Inputs
    if (!email || !password) return alert('All Fields are compulsory');

    const res = await fetch('/api/applicant/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    alert(json.message);
    if (res.status === 200) {
      dispatch({ type: 'APPLICANT', payload: 'APPLICANT' });
      history.goBack();
    }
  };
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='form'>
        <h1>Login</h1>
        <Form>
          <Form.Group controlId='formBasicEmail' className='input-div'>
            <Form.Label>
              Email address <span className='required'>*</span>{' '}
            </Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              value={input.email}
              onChange={handleInput}
              required
            />
            <Form.Text className='text-muted'></Form.Text>
          </Form.Group>

          <Form.Group controlId='formBasicPassword' className='input-div'>
            <Form.Label>
              Password <span className='required'>*</span>
            </Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              value={input.password}
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
            className='input-submit'
            onClick={submitForm}
          >
            Login
          </Button>
        </Form>
        <p className='text-center mt-3'>
          New to Jobspot? <Link to='/applicant/register'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
