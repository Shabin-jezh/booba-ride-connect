
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, Map, Clock, Car } from 'lucide-react';
import { format } from 'date-fns';

// Sample data for bookings
const upcomingBookings = [
  {
    id: 'BK-1001',
    type: 'Chauffeur',
    status: 'Confirmed',
    date: new Date(2025, 5, 15),
    pickup: '123 Main St, New York',
    dropoff: 'JFK Airport, Terminal 4',
    vehicle: 'Mercedes E-Class',
    amount: '$78.50',
  },
  {
    id: 'BK-1003',
    type: 'Rental',
    status: 'Pending',
    date: new Date(2025, 5, 20),
    pickup: '456 Park Ave, New York',
    dropoff: 'N/A (Rental)',
    vehicle: 'BMW 3 Series',
    amount: '$145.00',
  },
];

const pastBookings = [
  {
    id: 'BK-0985',
    type: 'Chauffeur',
    status: 'Completed',
    date: new Date(2025, 4, 28),
    pickup: '789 Broadway, New York',
    dropoff: 'Newark Airport, Terminal C',
    vehicle: 'Toyota Camry',
    amount: '$62.75',
  },
  {
    id: 'BK-0972',
    type: 'Rental',
    status: 'Completed',
    date: new Date(2025, 4, 15),
    pickup: '123 Main St, New York',
    dropoff: 'N/A (Rental)',
    vehicle: 'Hyundai Elantra',
    amount: '$110.25',
  },
  {
    id: 'BK-0964',
    type: 'Chauffeur',
    status: 'Cancelled',
    date: new Date(2025, 4, 10),
    pickup: '555 5th Ave, New York',
    dropoff: 'LaGuardia Airport, Terminal B',
    vehicle: 'Toyota Corolla',
    amount: '$0.00',
  },
];

const BookingCard = ({ booking }: { booking: typeof upcomingBookings[0] }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">{booking.type} Service</CardTitle>
          <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
        </div>
        <Badge className={`
          ${booking.status === 'Completed' ? 'bg-green-100 text-green-800' : 
            booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 
            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'}
        `}>
          {booking.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-gray-500">{format(booking.date, 'MMMM d, yyyy')}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Car className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Vehicle</p>
                <p className="text-sm text-gray-500">{booking.vehicle}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Map className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Pickup Location</p>
              <p className="text-sm text-gray-500">{booking.pickup}</p>
            </div>
          </div>
          
          {booking.type === 'Chauffeur' && (
            <div className="flex items-start gap-2">
              <Map className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Dropoff Location</p>
                <p className="text-sm text-gray-500">{booking.dropoff}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between border-t pt-4 mt-4">
            <div>
              <p className="text-sm font-medium">Amount</p>
              <p className="text-lg font-bold">{booking.amount}</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Details
              </Button>
              {booking.status !== 'Cancelled' && (
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Receipt
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MyBookings = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-fleet-red to-fleet-accent py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">My Bookings</h1>
          <p className="text-white/90 mt-2">View and manage your bookings</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="upcoming">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600">No Upcoming Bookings</h3>
                <p className="text-gray-500 mb-4">You don't have any upcoming bookings.</p>
                <Button className="bg-fleet-red hover:bg-fleet-red/90 text-white">Book a Ride</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastBookings.length > 0 ? (
              pastBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600">No Past Bookings</h3>
                <p className="text-gray-500 mb-4">You haven't taken any rides yet.</p>
                <Button className="bg-fleet-red hover:bg-fleet-red/90 text-white">Book Your First Ride</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyBookings;
