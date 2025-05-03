
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Vehicles from '@/components/home/Vehicles';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import MapSection from '@/components/home/MapSection';
import HowItWorks from '@/components/home/HowItWorks';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <Features />
      <MapSection />
      <Vehicles />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Index;
