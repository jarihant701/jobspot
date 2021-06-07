import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
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
    const { name, email, password, cpassword } = input;

    //Validating Form Inputs
    if (!name || !email || !password || !cpassword)
      return alert('All Fields are compulsory');

    if (password !== cpassword)
      return alert("Password and Confirm Password Field doesn't match");

    const res = await fetch('/api/applicant/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    console.log(json);
    alert(json.message);
    if (res.status === 200) history.push('/applicant/login');
  };
  return (
    <div className='form'>
      <h1>Register</h1>
      <Form>
        <Form.Group className='input-div'>
          <Form.Label>
            Name <span className='required'>*</span>{' '}
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='John Doe'
            onChange={handleInput}
            name='name'
            value={input.name}
          />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>
        <Form.Group controlId='formBasicEmail' className='input-div'>
          <Form.Label>
            Email address <span className='required'>*</span>
          </Form.Label>
          <Form.Control
            type='email'
            placeholder='john@example.com'
            onChange={handleInput}
            name='email'
            value={input.email}
          />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword' className='input-div'>
          <Form.Label>
            Password <span className='required'>*</span>
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Must be atleast 6 character'
            onChange={handleInput}
            name='password'
            value={input.password}
          />
        </Form.Group>
        <Form.Group controlId='formBasicConfirmPassword' className='input-div'>
          <Form.Label>
            Confirm Password <span className='required'>*</span>
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            onChange={handleInput}
            name='cpassword'
            value={input.cpassword}
          />
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          className='input-submit'
          onClick={submitForm}
        >
          Register
        </Button>
      </Form>
      <p className='text-center mt-3'>
        Already have an account? <Link to='/recruiter/login'>Login</Link>
      </p>
    </div>
  );
};

export default Register;
