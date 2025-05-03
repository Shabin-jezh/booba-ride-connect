
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const vehicles = [
  {
    id: 1,
    name: 'Standard Sedan',
    description: 'Comfortable ride for up to 4 passengers',
    price: 25,
    imageUrl: 'https://placehold.co/300x200/FFD700/333333?text=Sedan',
    category: 'taxi',
  },
  {
    id: 2,
    name: 'Premium SUV',
    description: 'Spacious and elegant ride for up to 6 passengers',
    price: 40,
    imageUrl: 'https://placehold.co/300x200/FFD700/333333?text=SUV',
    category: 'taxi',
  },
  {
    id: 3,
    name: 'Economy Hatchback',
    description: 'Fuel efficient, perfect for city trips',
    price: 50,
    imageUrl: 'https://placehold.co/300x200/FFD700/333333?text=Hatchback',
    category: 'rental',
  },
  {
    id: 4,
    name: 'Luxury Sedan',
    description: 'Premium comfort and style for your rental needs',
    price: 90,
    imageUrl: 'https://placehold.co/300x200/FFD700/333333?text=Luxury',
    category: 'rental',
  },
];

const Vehicles = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-booba-dark">Our Fleet</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our selection of vehicles available for taxi service and rental.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden card-hover">
              <img 
                src={vehicle.imageUrl} 
                alt={vehicle.name} 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{vehicle.name}</h3>
                  <div className="bg-booba-yellow text-booba-dark px-2 py-1 rounded text-sm font-medium">
                    {vehicle.category === 'taxi' ? 'Taxi' : 'Rental'}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{vehicle.description}</p>
                <div className="flex justify-between items-center">
                  <div className="font-bold">
                    ${vehicle.price}
                    <span className="text-gray-500 text-sm font-normal">
                      {vehicle.category === 'taxi' ? '/ride' : '/day'}
                    </span>
                  </div>
                  <Button size="sm" className="bg-booba-dark hover:bg-booba-dark/90">
                    {vehicle.category === 'taxi' ? 'Book Now' : 'Rent Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button className="bg-booba-yellow text-booba-dark hover:bg-booba-yellow/90">
            View All Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Vehicles;
