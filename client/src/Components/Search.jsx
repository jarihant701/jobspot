import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const Search = () => {
  const [input, setInput] = useState({
    position: '',
    location: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Form className='hero_form'>
        <Row className='mb-3'>
          <Form.Group as={Col} md={5} className='hero_group'>
            <Form.Label>Position</Form.Label>
            <Form.Control
              type='text'
              placeholder='Position you are looking for'
              value={input.position}
              name='position'
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group as={Col} md={5} className='hero_group'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type='text'
              placeholder='Your Preferred Work Location'
              value={input.location}
              name='location'
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group as={Col} className='hero_group'>
            <Button
              as={Link}
              to={`/search/jobs?position=${input.position}&location=${input.location}`}
              variant='outline-primary'
              className='hero_button'
            >
              Search
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
};

export default Search;
