
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, MapPin, Plus, CheckCircle, XCircle, Settings } from 'lucide-react';

const AdminGeofencing = () => {
  const zones = [
    { id: '1', name: 'Downtown', status: 'active' },
    { id: '2', name: 'Airport', status: 'active' },
    { id: '3', name: 'North Suburbs', status: 'active' },
    { id: '4', name: 'East Suburb', status: 'inactive' },
    { id: '5', name: 'South Area', status: 'inactive' },
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Geofencing Management</h1>
        <Button className="bg-booba-yellow text-booba-dark hover:bg-booba-yellow/90">
          <Plus className="mr-2 h-4 w-4" /> Create New Zone
        </Button>
      </div>

      <Tabs defaultValue="map-view">
        <TabsList className="mb-6">
          <TabsTrigger value="map-view">Map View</TabsTrigger>
          <TabsTrigger value="list-view">List View</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="map-view">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Interactive Map</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Draw Zone
                  </Button>
                  <Button variant="outline" size="sm">
                    Import Boundaries
                  </Button>
                  <Button variant="outline" size="sm">
                    Export Data
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] bg-gray-200 rounded-lg relative">
                {/* This is a placeholder for the map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Map className="h-20 w-20 text-gray-400" />
                  <span className="absolute text-gray-600">Interactive geofencing map will be integrated here</span>
                </div>

                <div className="absolute top-4 right-4 bg-white p-3 rounded-md shadow-md">
                  <h3 className="font-medium text-sm mb-2">Active Zones</h3>
                  <div className="space-y-2">
                    {zones
                      .filter(zone => zone.status === 'active')
                      .map(zone => (
                        <div key={zone.id} className="flex items-center text-sm">
                          <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                          {zone.name}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Button size="sm">
                    <MapPin className="h-4 w-4 mr-1" /> Center Map
                  </Button>
                  <Button size="sm" variant="outline">
                    Reset View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Zone Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Zone analytics chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Downtown zone modified</p>
                      <p className="text-xs text-gray-500">Today, 10:45 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                      <Plus className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New zone "East Suburb" created</p>
                      <p className="text-xs text-gray-500">Yesterday, 2:30 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 flex-shrink-0">
                      <Settings className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fare rules updated for Airport zone</p>
                      <p className="text-xs text-gray-500">Yesterday, 11:20 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list-view">
          <Card>
            <CardHeader>
              <CardTitle>All Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Zone Name</th>
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Area Size</th>
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Status</th>
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Fare Multiplier</th>
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {zones.map((zone) => (
                        <tr key={zone.id} className="border-b">
                          <td className="p-4 font-medium">{zone.name}</td>
                          <td className="p-4">4.5 km²</td>
                          <td className="p-4">
                            <div className={`flex items-center gap-1 ${
                              zone.status === 'active' ? 'text-green-600' : 'text-gray-500'
                            }`}>
                              {zone.status === 'active' ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <XCircle className="h-4 w-4" />
                              )}
                              <span className="capitalize">{zone.status}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            {zone.status === 'active' ? '1.2x' : '-'}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Geofencing Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Zone Matching Algorithm</h3>
                    <select className="w-full rounded-md border border-gray-300 p-2">
                      <option>Point-in-polygon</option>
                      <option>Nearest edge</option>
                      <option>Center point</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      How pickup/dropoff points are associated with zones
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Default Zone Behavior</h3>
                    <select className="w-full rounded-md border border-gray-300 p-2">
                      <option>Apply base fare</option>
                      <option>Apply nearest zone fare</option>
                      <option>Apply custom fare</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      What to do when a location isn't within any defined zone
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-1">Peak Hours Settings</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-600">Morning Peak Start</label>
                        <input type="time" className="w-full rounded-md border border-gray-300 p-2" defaultValue="07:00" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600">Morning Peak End</label>
                        <input type="time" className="w-full rounded-md border border-gray-300 p-2" defaultValue="09:00" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600">Evening Peak Start</label>
                        <input type="time" className="w-full rounded-md border border-gray-300 p-2" defaultValue="17:00" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600">Evening Peak End</label>
                        <input type="time" className="w-full rounded-md border border-gray-300 p-2" defaultValue="19:00" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-3">
                    <Button className="bg-booba-yellow text-booba-dark hover:bg-booba-yellow/90">
                      Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Import/Export</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Import Zone Data</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="text-gray-500 mb-2">
                        Drop GeoJSON file here or click to upload
                      </div>
                      <Button variant="outline" size="sm">
                        Select File
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Export Options</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Map className="mr-2 h-4 w-4" /> Export All Zones (GeoJSON)
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <MapPin className="mr-2 h-4 w-4" /> Export Zone Boundaries (KML)
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Settings className="mr-2 h-4 w-4" /> Export Complete Configuration
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminGeofencing;
