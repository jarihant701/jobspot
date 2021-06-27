import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RecruiterProfile = () => {
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
  const [profile, setprofile] = useState({});
  const history = useHistory();
  useEffect(() => {
    const getInfo = async () => {
      const res = await fetch('/api/recruiter/get-info', {
        credentials: 'include',
        method: 'GET',
      });
      const data = await res.json();
      if (res.status >= 400) history.push('/recruiter/login');
      setprofile(data);
    };
    getInfo();
  }, [history]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setprofile((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const goBack = () => {
    if (window.confirm('Are you sure?')) history.goBack();
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const { name, email, about, contact, industry } = profile;
    const res = await fetch('/api/recruiter/update', {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ name, email, about, contact, industry }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    alert(data.message);
    if (res.status === 200) setprofile(data.recruiter);
  };

  return (
    <div className='applicant-profile'>
      <h1>Your Profile</h1>
      <Form>
        <Form.Group className='input-div my-3'>
          <Form.Label>
            Company Name <span className='required'>*</span>{' '}
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='JobSpot'
            onChange={handleInput}
            name='name'
            value={profile.name || ''}
          />
        </Form.Group>
        <Form.Group className='input-div my-3'>
          <Form.Label>
            Company Profile <span className='required'>*</span>{' '}
          </Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Write a brief description about the company'
            onChange={handleInput}
            name='about'
            value={profile.about || ''}
          />
        </Form.Group>
        <Form.Group className='input-div my-3'>
          <Form.Label>
            Official Email address <span className='required'>*</span>
          </Form.Label>
          <Form.Control
            type='email'
            placeholder='name@jobspot.com'
            onChange={handleInput}
            name='email'
            value={profile.email || ''}
          />
        </Form.Group>
        <Form.Group className='input-div my-3'>
          <Form.Label>
            Contact Number <span className='required'>*</span>
          </Form.Label>
          <Form.Control
            type='number'
            placeholder='10 digit mobile number'
            onChange={handleInput}
            name='contact'
            value={profile.contact || ''}
          />
        </Form.Group>
        <Form.Group className='input-div my-3'>
          <Form.Label>
            Industry Type <span className='required'>*</span>
          </Form.Label>
          <select
            className='form-select'
            value={profile.industry || ''}
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
        <div className='d-flex align-items-between'>
          <Button variant='danger' className='input-submit' onClick={goBack}>
            Go Back
          </Button>
          <Button
            variant='success'
            type='submit'
            className='input-submit ms-auto'
            onClick={updateProfile}
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RecruiterProfile;
