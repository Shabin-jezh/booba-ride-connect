
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import BookTaxiForm from './BookTaxiForm';
import RentCarForm from './RentCarForm';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-fleet-red/90 to-fleet-accent pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Your Reliable Ride & Rental Solution
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Book a chauffeur for your immediate travel needs or rent a car hourly for longer trips.
              First Class Fleet offers comfort, reliability, and affordability.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/chauffeur">
                <Button className="bg-white text-fleet-red hover:bg-white/90 text-lg px-6 py-6">
                  Book a Chauffeur
                </Button>
              </Link>
              <Link to="/hourly">
                <Button variant="outline" className="border-white border-2 text-white hover:bg-white/20 text-lg px-6 py-6">
                  Hourly
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-10 w-full max-w-md lg:max-w-full mx-auto animate-scale-in">
            <Card className="p-6 shadow-lg">
              <Tabs defaultValue="taxi">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="taxi">Book a Chauffeur</TabsTrigger>
                  <TabsTrigger value="rental">Hourly</TabsTrigger>
                </TabsList>
                <TabsContent value="taxi">
                  <BookTaxiForm />
                </TabsContent>
                <TabsContent value="rental">
                  <RentCarForm />
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
