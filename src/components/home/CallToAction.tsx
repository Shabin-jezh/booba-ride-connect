
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-booba-yellow">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-booba-dark mb-6">
          Ready to Experience Our Service?
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
          Whether you need a taxi right now or want to rent a car for your next trip,
          we've got you covered. Join our satisfied customers today!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/taxi">
            <Button className="bg-booba-dark text-white hover:bg-booba-dark/90 text-lg px-6 py-6">
              Book a Taxi
            </Button>
          </Link>
          <Link to="/rental">
            <Button variant="outline" className="border-booba-dark text-booba-dark hover:bg-booba-dark/10 text-lg px-6 py-6">
              Rent a Car
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
