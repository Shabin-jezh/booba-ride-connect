
import React from 'react';
import Layout from '@/components/Layout';
import { info } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-fleet-red to-fleet-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center">
            <info className="mr-2 h-8 w-8" />
            About First Class Fleet
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Your trusted partner for premium transportation solutions since 2010.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-fleet-dark mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              First Class Fleet was founded with a simple mission: to provide exceptional transportation services that prioritize comfort, reliability, and customer satisfaction.
            </p>
            <p className="text-gray-700 mb-4">
              What began as a small operation with just three vehicles has grown into a comprehensive transportation service with a diverse fleet of premium vehicles and professional chauffeurs serving thousands of satisfied customers.
            </p>
            <p className="text-gray-700">
              Today, we continue to uphold our founding principles while embracing innovation and sustainability in our operations.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <img 
              src="/lovable-uploads/99f9ce6d-a760-4be6-9f4e-a7b4f21334c2.png" 
              alt="First Class Fleet Team" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-fleet-dark mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-fleet-dark mb-2">Excellence</h3>
              <p className="text-gray-700">
                We strive for excellence in every aspect of our service, from vehicle maintenance to customer interactions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-fleet-dark mb-2">Reliability</h3>
              <p className="text-gray-700">
                Punctuality and dependability are the cornerstones of our business. We're there when you need us.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-fleet-dark mb-2">Innovation</h3>
              <p className="text-gray-700">
                We continuously adopt new technologies and practices to enhance the customer experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-fleet-dark mb-2">Safety</h3>
              <p className="text-gray-700">
                The safety of our customers and staff is our highest priority. All vehicles undergo rigorous safety checks.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-fleet-dark mb-2">Sustainability</h3>
              <p className="text-gray-700">
                We're committed to reducing our environmental footprint through eco-friendly practices and vehicle options.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-fleet-dark mb-2">Integrity</h3>
              <p className="text-gray-700">
                We conduct business with honesty, transparency, and respect for all our stakeholders.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-fleet-dark mb-6 text-center">Our Team</h2>
          <p className="text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Our success is driven by our dedicated team of professionals who are passionate about providing exceptional service.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold text-fleet-dark">John Doe</h3>
              <p className="text-fleet-red">CEO & Founder</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold text-fleet-dark">Jane Smith</h3>
              <p className="text-fleet-red">Operations Director</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold text-fleet-dark">Michael Brown</h3>
              <p className="text-fleet-red">Fleet Manager</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold text-fleet-dark">Sarah Johnson</h3>
              <p className="text-fleet-red">Customer Relations</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
