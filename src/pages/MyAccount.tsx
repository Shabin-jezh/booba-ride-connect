
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Phone, Mail, MapPin, CreditCard } from 'lucide-react';

const MyAccount = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-fleet-red to-fleet-accent py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">My Account</h1>
          <p className="text-white/90 mt-2">Manage your profile and preferences</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mb-4">
                    <User className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <p className="text-gray-500">Member since Jan 2023</p>
                  <div className="mt-6 w-full">
                    <Button className="w-full bg-fleet-red hover:bg-fleet-red/90 text-white">
                      Edit Profile
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4 border-t pt-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>johndoe@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>123 Main St, New York, NY</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                        <Input id="email" type="email" defaultValue="johndoe@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="address" className="text-sm font-medium">Address</label>
                        <Input id="address" defaultValue="123 Main St" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="city" className="text-sm font-medium">City</label>
                          <Input id="city" defaultValue="New York" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="state" className="text-sm font-medium">State</label>
                          <Input id="state" defaultValue="NY" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="zip" className="text-sm font-medium">ZIP Code</label>
                          <Input id="zip" defaultValue="10001" />
                        </div>
                      </div>
                      
                      <Button className="bg-fleet-red hover:bg-fleet-red/90 text-white">
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <CreditCard className="w-8 h-8 text-gray-500" />
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/25</p>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <CreditCard className="w-8 h-8 text-gray-500" />
                          <div>
                            <p className="font-medium">MasterCard ending in 8888</p>
                            <p className="text-sm text-gray-500">Expires 08/24</p>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline">Edit</Button>
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        <CreditCard className="mr-2" />
                        Add New Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-500">Receive booking confirmations and updates</p>
                        </div>
                        <div>
                          <input type="checkbox" className="toggle" id="email-notifications" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">SMS Notifications</h4>
                          <p className="text-sm text-gray-500">Receive text message alerts</p>
                        </div>
                        <div>
                          <input type="checkbox" className="toggle" id="sms-notifications" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Marketing Communications</h4>
                          <p className="text-sm text-gray-500">Receive offers and promotions</p>
                        </div>
                        <div>
                          <input type="checkbox" className="toggle" id="marketing" />
                        </div>
                      </div>
                      
                      <Button className="bg-fleet-red hover:bg-fleet-red/90 text-white">
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyAccount;
