import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
  return (
    <div className='form'>
      <h1>Login</h1>
      <Form>
        <Form.Group controlId='formBasicEmail' className='input-div'>
          <Form.Label>
            Email address <span className='required'>*</span>{' '}
          </Form.Label>
          <Form.Control type='email' placeholder='Enter email' required />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword' className='input-div'>
          <Form.Label>
            Password <span className='required'>*</span>
          </Form.Label>
          <Form.Control type='password' placeholder='Password' required />
        </Form.Group>
        <Button variant='primary' type='submit' className='input-submit'>
          Login
        </Button>
      </Form>
      <p className='text-center mt-3'>
        New to Jobspot? <Link to='/applicant/register'>Register</Link>
      </p>
    </div>
  );
};

export default Login;
