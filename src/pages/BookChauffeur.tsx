
import React from 'react';
import Layout from '@/components/Layout';
import { book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import BookTaxiForm from '@/components/home/BookTaxiForm';

const BookChauffeur = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-fleet-red to-fleet-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book a Chauffeur</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Professional chauffeurs at your service. Safe, reliable, and comfortable rides to your destination.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl font-bold text-fleet-dark mb-6 flex items-center">
              <book className="mr-2 h-6 w-6" />
              Schedule Your Ride
            </h2>
            <p className="text-gray-700 mb-8">
              Our professional chauffeurs are ready to take you to your destination. Enter your details below to book a chauffeur service.
            </p>
            
            <Card className="p-6 shadow-lg">
              <BookTaxiForm />
            </Card>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-fleet-dark mb-6">Why Choose Our Chauffeur Service?</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-fleet-dark mb-2">Professional Drivers</h3>
                <p className="text-gray-700">All our chauffeurs are professionally trained, licensed, and experienced in providing exceptional service.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-fleet-dark mb-2">Premium Vehicles</h3>
                <p className="text-gray-700">Travel in style and comfort with our fleet of well-maintained premium vehicles.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-fleet-dark mb-2">Punctuality Guaranteed</h3>
                <p className="text-gray-700">We value your time. Our chauffeurs always arrive on schedule to ensure you reach your destination on time.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-fleet-dark mb-2">24/7 Availability</h3>
                <p className="text-gray-700">Our chauffeur services are available round the clock to serve you whenever you need us.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookChauffeur;
