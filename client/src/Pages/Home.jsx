import React from 'react';
import HeroSection from '../Components/HeroSection';
import RecentJobs from '../Components/RecentJobs';
import SearchByLocation from '../Components/SearchByLocation';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#f4f4f4', paddingBottom: '0.5rem' }}>
      <HeroSection />
      <RecentJobs />
      <SearchByLocation />
    </div>
  );
};

export default Home;
