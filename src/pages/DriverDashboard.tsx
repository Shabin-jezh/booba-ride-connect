
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';
import { toast } from 'sonner';

const earningsData = [
  { name: 'Mon', earnings: 120 },
  { name: 'Tue', earnings: 145 },
  { name: 'Wed', earnings: 105 },
  { name: 'Thu', earnings: 190 },
  { name: 'Fri', earnings: 210 },
  { name: 'Sat', earnings: 250 },
  { name: 'Sun', earnings: 180 },
];

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = React.useState(false);
  
  const toggleStatus = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    toast.success(newStatus ? "You are now online and can receive ride requests!" : "You are now offline.");
  };
  
  return (
    <DashboardLayout userType="driver">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome, David!</h1>
        <p className="text-gray-600">Here's your activity summary for today.</p>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-booba-yellow flex items-center justify-center text-booba-dark font-bold text-2xl">
                D
              </div>
              <div>
                <h2 className="text-xl font-semibold">David Johnson</h2>
                <div className="flex items-center gap-2">
                  <Badge variant={isOnline ? "default" : "outline"} className={isOnline ? "bg-green-500" : ""}>
                    {isOnline ? "Online" : "Offline"}
                  </Badge>
                  <span className="text-sm text-gray-500">4.8 ★</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={toggleStatus}
              className={isOnline ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
            >
              Go {isOnline ? "Offline" : "Online"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$132.50</div>
            <p className="text-xs text-green-600 flex items-center">
              <span>↑</span> 12% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-green-600 flex items-center">
              <span>↑</span> 2 more than yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Online Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.5</div>
            <p className="text-xs text-gray-500 flex items-center">
              Today's hours
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Earnings</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="earnings" stroke="#FFDA29" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Rides</CardTitle>
            <CardDescription>Your scheduled pickups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isOnline ? (
                <>
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">John D.</span>
                      <Badge>5 mins away</Badge>
                    </div>
                    <p className="text-sm mb-2">123 Main St to Airport</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Standard Sedan</span>
                      <span className="font-medium">$24.50</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="w-1/2">Reject</Button>
                      <Button size="sm" className="w-1/2 bg-booba-yellow text-booba-dark hover:bg-booba-yellow/90">Accept</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Sarah M.</span>
                      <Badge variant="outline">2:30 PM</Badge>
                    </div>
                    <p className="text-sm mb-2">45 Park Ave to Downtown</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Premium SUV</span>
                      <span className="font-medium">$35.00</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>Go online to receive ride requests</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DriverDashboard;
