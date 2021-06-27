import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const EducationDetails = (props) => {
  return (
    <div>
      <Form.Group as={Row} className='mb-3'>
        <Col sm={3}>
          <select className='form-select' aria-label='Default select example'>
            <option value='10th'>10th</option>
            <option value='12th'>12th</option>
            <option value='UG'>UG</option>
            <option value='PG'>PG</option>
          </select>
        </Col>
        <Col sm={6}>
          <select className='form-select' aria-label='Default select example'>
            <option defaulValue='10th'>Any degree</option>
            <option value='12th'>Bachelor of Arts</option>
            <option value='UG'>Bachelor of Science</option>
            <option value='PG'>Bachelor of Commerce</option>
            <option value='PG'>Bachelor of Engg./Tech</option>
            <option value='PG'>BMS/BBA/BBS</option>
            <option value='PG'>Bachelor of Law</option>
            <option value='PG'>Bachelor of Medicine (MBBS)</option>
            <option value='PG'>IIM 5-year Integrated Mgmt. Programme</option>
          </select>
        </Col>
      </Form.Group>
    </div>
  );
};

export default EducationDetails;
