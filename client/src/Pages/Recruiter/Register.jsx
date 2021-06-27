import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Badge from 'react-bootstrap/Badge';

const Register = () => {
  const industryTypes = [
    'Textile/Garment/Fashion/Accessories',
    'Accounting/Finance',
    'Advertising/PR',
    'Agriculture/Dairy',
    'Hotels/Restaurants/Airlines/Travel',
    'Architecture/Interior Design',
    'Automobile',
    'Pharma/Biotech',
    'Construction/Enginerring/Metals',
    'Plastic/Rubber',
    'FMCG/Food/Beverage',
    'Consumer Goods/Durables',
    'Courier Transportation',
    'BPO/Call Center',
    'Education',
    'Recruitment',
    'Export/Import',
    'Gems/Jewellery',
    'IT Software/Software Services',
    'Medical/Healtcare/Hospital',
    'Legal',
    'NGO',
    'Packing/Printing',
    'Real Estate',
    'Retail',
    'Security',
    'Electronics',
    'Telecom',
    'Others',
  ];
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [input, setInput] = useState({
    name: '',
    about: '',
    email: '',
    contact: '',
    industry: '',
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
    const { name, about, contact, email, industry, password, cpassword } =
      input;

    //Validating Form Inputs
    if (
      !name ||
      !about ||
      !contact ||
      !email ||
      !industry ||
      !password ||
      !cpassword
    )
      return alert('All Fields are compulsory');
    if (!emailRegex.test(email)) {
      setInput((prev) => ({
        ...prev,
        email: '',
        password: '',
        cpassword: '',
      }));
      return alert('Email is not valid');
    }
    if (!strongRegex.test(password)) {
      setInput((prev) => ({
        ...prev,
        password: '',
        cpassword: '',
      }));
      return alert('Your password is not strong');
    }

    if (password !== cpassword)
      return alert("Password and Confirm Password Field doesn't match");

    const res = await fetch('/api/recruiter/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        about,
        contact,
        email,
        industry,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    alert(json.message);
    if (res.status === 200) history.push('/recruiter/login');
  };

  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      Alteast 8 characters long
      <br />
      Atleast 1 uppercase letter
      <br />
      Atleast 1 lowercase letter
      <br />
      Atleast 1 numeric character
      <br />
      Atleast 1 special character
      <br />
    </Tooltip>
  );

  return (
    <div className='form'>
      <h1>Register</h1>
      <Form>
        <Form.Group className='input-div'>
          <Form.Label>
            Company Name <span className='required'>*</span>{' '}
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='JobSpot'
            onChange={handleInput}
            name='name'
            value={input.name || ''}
          />
        </Form.Group>
        <Form.Group className='input-div'>
          <Form.Label>
            Company Profile <span className='required'>*</span>{' '}
          </Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Write a brief description about the company'
            onChange={handleInput}
            name='about'
            value={input.about || ''}
          />
        </Form.Group>
        <Form.Group className='input-div'>
          <Form.Label>
            Official Email address <span className='required'>*</span>
          </Form.Label>
          <Form.Control
            type='email'
            placeholder='name@jobspot.com'
            onChange={handleInput}
            name='email'
            value={input.email || ''}
          />
        </Form.Group>
        <Form.Group className='input-div'>
          <Form.Label>
            Contact Number <span className='required'>*</span>
          </Form.Label>
          <Form.Control
            type='number'
            placeholder='10 digit mobile number'
            onChange={handleInput}
            name='contact'
            value={input.contact || ''}
          />
        </Form.Group>
        <Form.Group className='input-div'>
          <Form.Label>
            Industry Type <span className='required'>*</span>
          </Form.Label>
          <select
            className='form-select'
            value={input.industry || ''}
            onChange={handleInput}
            name='industry'
          >
            <option defaultValue={undefined}>Select</option>
            {industryTypes.map((industryType, index) => (
              <option value={industryType} key={index}>
                {industryType}
              </option>
            ))}
          </select>
        </Form.Group>

        <Form.Group className='input-div'>
          <Form.Label>
            Password <span className='required'>*</span>
            <OverlayTrigger
              placement='right'
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Badge className='bg-primary ms-1'>
                <i className='fas fa-question'></i>
              </Badge>
            </OverlayTrigger>
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Must be atleast 8 character'
            onChange={handleInput}
            name='password'
            value={input.password || ''}
          />
        </Form.Group>
        <Form.Group className='input-div'>
          <Form.Label>
            Confirm Password <span className='required'>*</span>
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password again'
            onChange={handleInput}
            name='cpassword'
            value={input.cpassword || ''}
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
