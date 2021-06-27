import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const JobCard = ({
  _id,
  title,
  company,
  experience,
  salary,
  location,
  about,
  skills,
}) => {
  return (
    <div>
      <Card className='jobcard'>
        <Card.Body>
          <Card.Title>
            <Link to={'/job/' + _id} className='job-title-link'>
              {title}
            </Link>
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>{company}</Card.Subtitle>
          <Card.Text className='fs-9'>
            <i className='fas fa-star'></i>{' '}
            {experience === undefined
              ? 'No Experince needed'
              : `${experience} Yrs`}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <i className='fas fa-rupee-sign'></i>{' '}
            {salary === undefined ? 'Not Disclosed' : `${salary} pa`}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <i className='fas fa-map-marker-alt'></i> {location}
          </Card.Text>
          <Card.Text style={{ color: 'rgb(83, 103, 119)' }}>
            {about.length > 250 ? `${about.slice(0, 250)} ...` : about}
          </Card.Text>
          <Card.Text>
            <i
              className='fas fa-lightbulb me-2'
              style={{ color: 'rgb(83, 103, 119)' }}
            ></i>
            {skills?.map((skill, index) => (
              <Badge key={index} className='bg-primary me-2 mb-2' pill>
                {skill}
              </Badge>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobCard;
