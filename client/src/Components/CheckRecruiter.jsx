import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const CheckRecruiter = () => {
  const history = useHistory();
  useEffect(() => {
    const checkLoggedIn = async () => {
      const data = await fetch('/api/recruiter/check', {
        credentials: 'include',
      });
      if (data.status === 401) history.push('/recruiter/login');
    };
    checkLoggedIn();
  }, [history]);
  return <div></div>;
};

export default CheckRecruiter;
