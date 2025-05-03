
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Edit2, Trash2, MapPin, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface FareRule {
  id: string;
  name: string;
  fromLocation: string;
  toLocation: string;
  baseFare: number;
  additionalFare: number;
  taxiTypeId: string;
  peakHourMultiplier: number;
}

interface Zone {
  id: string;
  name: string;
  description: string;
  baseFareMultiplier: number;
}

const AdminFareSettings = () => {
  const [fareRules, setFareRules] = useState<FareRule[]>([
    {
      id: '1',
      name: 'Downtown to Airport',
      fromLocation: 'Downtown',
      toLocation: 'Airport',
      baseFare: 25,
      additionalFare: 5,
      taxiTypeId: '1',
      peakHourMultiplier: 1.2
    },
    {
      id: '2',
      name: 'Airport to Downtown',
      fromLocation: 'Airport',
      toLocation: 'Downtown',
      baseFare: 30,
      additionalFare: 5,
      taxiTypeId: '1',
      peakHourMultiplier: 1.2
    },
    {
      id: '3',
      name: 'Suburb to Downtown',
      fromLocation: 'Suburb',
      toLocation: 'Downtown',
      baseFare: 20,
      additionalFare: 3,
      taxiTypeId: '1',
      peakHourMultiplier: 1.1
    }
  ]);
  
  const [zones, setZones] = useState<Zone[]>([
    {
      id: '1',
      name: 'Downtown',
      description: 'Central business district',
      baseFareMultiplier: 1
    },
    {
      id: '2',
      name: 'Airport',
      description: 'International airport area',
      baseFareMultiplier: 1.2
    },
    {
      id: '3',
      name: 'Suburb',
      description: 'Residential suburbs',
      baseFareMultiplier: 0.9
    }
  ]);
  
  const [currentFareRule, setCurrentFareRule] = useState<FareRule | null>(null);
  const [currentZone, setCurrentZone] = useState<Zone | null>(null);
  const [isFareDialogOpen, setIsFareDialogOpen] = useState(false);
  const [isZoneDialogOpen, setIsZoneDialogOpen] = useState(false);
  
  // Taxi types (normally would be fetched from API)
  const taxiTypes = [
    { id: '1', name: 'Economy' },
    { id: '2', name: 'Comfort' },
    { id: '3', name: 'SUV' },
    { id: '4', name: 'Premium' }
  ];
  
  const handleAddEditFare = (fareRule: FareRule | null) => {
    setCurrentFareRule(fareRule || {
      id: (fareRules.length + 1).toString(),
      name: '',
      fromLocation: '',
      toLocation: '',
      baseFare: 0,
      additionalFare: 0,
      taxiTypeId: '1',
      peakHourMultiplier: 1
    });
    setIsFareDialogOpen(true);
  };
  
  const handleAddEditZone = (zone: Zone | null) => {
    setCurrentZone(zone || {
      id: (zones.length + 1).toString(),
      name: '',
      description: '',
      baseFareMultiplier: 1
    });
    setIsZoneDialogOpen(true);
  };
  
  const handleDeleteFare = (id: string) => {
    setFareRules(fareRules.filter(rule => rule.id !== id));
    toast.success('Fare rule deleted successfully');
  };
  
  const handleDeleteZone = (id: string) => {
    setZones(zones.filter(zone => zone.id !== id));
    toast.success('Zone deleted successfully');
  };
  
  const handleFareFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFareRule) return;
    
    if (fareRules.some(rule => rule.id === currentFareRule.id)) {
      setFareRules(fareRules.map(rule => 
        rule.id === currentFareRule.id ? currentFareRule : rule
      ));
      toast.success('Fare rule updated successfully');
    } else {
      setFareRules([...fareRules, currentFareRule]);
      toast.success('Fare rule added successfully');
    }
    
    setIsFareDialogOpen(false);
  };
  
  const handleZoneFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentZone) return;
    
    if (zones.some(zone => zone.id === currentZone.id)) {
      setZones(zones.map(zone => 
        zone.id === currentZone.id ? currentZone : zone
      ));
      toast.success('Zone updated successfully');
    } else {
      setZones([...zones, currentZone]);
      toast.success('Zone added successfully');
    }
    
    setIsZoneDialogOpen(false);
  };
  
  return (
    <DashboardLayout userType="admin">
      <h1 className="text-2xl font-bold mb-6">Fare Settings</h1>
      
      <Tabs defaultValue="fare-rules">
        <TabsList className="mb-6">
          <TabsTrigger value="fare-rules">Fare Rules</TabsTrigger>
          <TabsTrigger value="zones">Zones & Geofencing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fare-rules">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Location-based Fare Rules</h2>
            <Dialog open={isFareDialogOpen} onOpenChange={setIsFareDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleAddEditFare(null)} className="bg-booba-yellow text-booba-dark hover:bg-booba-yellow/90">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Fare Rule
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{currentFareRule?.id ? 'Edit' : 'Add'} Fare Rule</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleFareFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium mb-1 block">Rule Name</label>
                    <Input
                      id="name"
                      value={currentFareRule?.name || ''}
                      onChange={(e) => setCurrentFareRule(curr => curr ? {...curr, name: e.target.value} : null)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fromLocation" className="text-sm font-medium mb-1 block">From Zone</label>
                      <Select 
                        value={currentFareRule?.fromLocation || ''} 
                        onValueChange={(value) => setCurrentFareRule(curr => curr ? {...curr, fromLocation: value} : null)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select zone" />
                        </SelectTrigger>
                        <SelectContent>
                          {zones.map(zone => (
                            <SelectItem key={zone.id} value={zone.name}>
                              {zone.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="toLocation" className="text-sm font-medium mb-1 block">To Zone</label>
                      <Select 
                        value={currentFareRule?.toLocation || ''} 
                        onValueChange={(value) => setCurrentFareRule(curr => curr ? {...curr, toLocation: value} : null)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select zone" />
                        </SelectTrigger>
                        <SelectContent>
                          {zones.map(zone => (
                            <SelectItem key={zone.id} value={zone.name}>
                              {zone.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="taxiType" className="text-sm font-medium mb-1 block">Taxi Type</label>
                    <Select 
                      value={currentFareRule?.taxiTypeId || ''} 
                      onValueChange={(value) => setCurrentFareRule(curr => curr ? {...curr, taxiTypeId: value} : null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select taxi type" />
                      </SelectTrigger>
                      <SelectContent>
                        {taxiTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="baseFare" className="text-sm font-medium mb-1 block">Base Fare ($)</label>
                      <Input
                        id="baseFare"
                        type="number"
                        step="0.01"
                        value={currentFareRule?.baseFare || 0}
                        onChange={(e) => setCurrentFareRule(curr => curr ? {...curr, baseFare: parseFloat(e.target.value)} : null)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="additionalFare" className="text-sm font-medium mb-1 block">Additional Fare ($)</label>
                      <Input
                        id="additionalFare"
                        type="number"
                        step="0.01"
                        value={currentFareRule?.additionalFare || 0}
                        onChange={(e) => setCurrentFareRule(curr => curr ? {...curr, additionalFare: parseFloat(e.target.value)} : null)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="peakHourMultiplier" className="text-sm font-medium mb-1 block">Peak Hour Multiplier</label>
                    <Input
                      id="peakHourMultiplier"
                      type="number"
                      step="0.01"
                      min="1"
                      max="3"
                      value={currentFareRule?.peakHourMultiplier || 1}
                      onChange={(e) => setCurrentFareRule(curr => curr ? {...curr, peakHourMultiplier: parseFloat(e.target.value)} : null)}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Multiplier applied during peak hours (e.g., 1.2 = 20% increase)</p>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" onClick={() => setIsFareDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-booba-yellow text-booba-dark hover:bg-booba-yellow/90">
                      {currentFareRule?.id ? 'Update' : 'Add'} Fare Rule
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {fareRules.map((rule) => (
              <Card key={rule.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{rule.name}</CardTitle>
                    <div className="space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => handleAddEditFare(rule)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteFare(rule.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-500" /> From:
                    </div>
                    <div className="font-medium">{rule.fromLocation}</div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-500" /> To:
                    </div>
                    <div className="font-medium">{rule.toLocation}</div>
                    
                    <div>Taxi Type:</div>
                    <div className="font-medium">
                      {taxiTypes.find(t => t.id === rule.taxiTypeId)?.name || 'Unknown'}
                    </div>
                    
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-gray-500" /> Base Fare:
                    </div>
                    <div className="font-medium">${rule.baseFare.toFixed(2)}</div>
                    
                    <div>Additional Fare:</div>
                    <div className="font-medium">${rule.additionalFare.toFixed(2)}</div>
                    
                    <div>Peak Hour Rate:</div>
                    <div className="font-medium">{rule.peakHourMultiplier}x</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="zones">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Zones & Geofencing</h2>
            <Dialog open={isZoneDialogOpen} onOpenChange={setIsZoneDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleAddEditZone(null)} className="bg-booba-yellow text-booba-dark hover:bg-booba-yellow/90">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Zone
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{currentZone?.id ? 'Edit' : 'Add'} Zone</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleZoneFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="zoneName" className="text-sm font-medium mb-1 block">Zone Name</label>
                    <Input
                      id="zoneName"
                      value={currentZone?.name || ''}
                      onChange={(e) => setCurrentZone(curr => curr ? {...curr, name: e.target.value} : null)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zoneDescription" className="text-sm font-medium mb-1 block">Description</label>
                    <Input
                      id="zoneDescription"
                      value={currentZone?.description || ''}
                      onChange={(e) => setCurrentZone(curr => curr ? {...curr, description: e.target.value} : null)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="baseFareMultiplier" className="text-sm font-medium mb-1 block">Base Fare Multiplier</label>
                    <Input
                      id="baseFareMultiplier"
                      type="number"
                      step="0.01"
                      min="0.5"
                      max="3"
                      value={currentZone?.baseFareMultiplier || 1}
                      onChange={(e) => setCurrentZone(curr => curr ? {...curr, baseFareMultiplier: parseFloat(e.target.value)} : null)}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Multiplier applied to base fare for this zone</p>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" onClick={() => setIsZoneDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-booba-yellow text-booba-dark hover:bg-booba-yellow/90">
                      {currentZone?.id ? 'Update' : 'Add'} Zone
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone) => (
              <Card key={zone.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{zone.name}</CardTitle>
                    <div className="space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => handleAddEditZone(zone)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteZone(zone.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{zone.description}</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>Base Fare Multiplier:</div>
                    <div className="font-medium">{zone.baseFareMultiplier}x</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Geofencing Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-200 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive geofencing map will be integrated here</p>
                  <p className="text-sm text-gray-500 mt-2">You'll be able to draw zones directly on the map</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminFareSettings;
