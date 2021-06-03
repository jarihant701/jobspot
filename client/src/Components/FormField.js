import React from 'react';

const FormField = ({ type, placeholder, required }) => {
  return <input type={type} placeholder={placeholder} required={required} />;
};

export default FormField;
