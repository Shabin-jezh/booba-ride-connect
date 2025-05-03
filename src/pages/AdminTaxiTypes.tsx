
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface TaxiType {
  id: string;
  name: string;
  description: string;
  baseRate: number;
  perKmRate: number;
  perMinuteRate: number;
  capacity: number;
  emoji: string;
}

const AdminTaxiTypes = () => {
  const [taxiTypes, setTaxiTypes] = useState<TaxiType[]>([
    { 
      id: '1', 
      name: 'Economy', 
      description: 'Affordable rides for everyday use',
      baseRate: 5,
      perKmRate: 1.5,
      perMinuteRate: 0.2,
      capacity: 4,
      emoji: '🚗'
    },
    { 
      id: '2', 
      name: 'Comfort', 
      description: 'More space and comfort for a better experience',
      baseRate: 8,
      perKmRate: 2.0,
      perMinuteRate: 0.25,
      capacity: 4,
      emoji: '🚕'
    },
    { 
      id: '3', 
      name: 'SUV', 
      description: 'Spacious vehicles for groups and families',
      baseRate: 10,
      perKmRate: 2.5,
      perMinuteRate: 0.3,
      capacity: 6,
      emoji: '🚙'
    },
    { 
      id: '4', 
      name: 'Premium', 
      description: 'Luxury vehicles for special occasions',
      baseRate: 15,
      perKmRate: 3.0,
      perMinuteRate: 0.4,
      capacity: 4,
      emoji: '🏎️'
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTaxiType, setCurrentTaxiType] = useState<TaxiType | null>(null);
  
  const handleAddEdit = (taxiType: TaxiType | null) => {
    setCurrentTaxiType(taxiType || {
      id: (taxiTypes.length + 1).toString(),
      name: '',
      description: '',
      baseRate: 0,
      perKmRate: 0,
      perMinuteRate: 0,
      capacity: 4,
      emoji: '🚗'
    });
    setIsDialogOpen(true);
  };
  
  const handleDelete = (id: string) => {
    // In a real app, this would call an API to delete the taxi type
    setTaxiTypes(taxiTypes.filter(type => type.id !== id));
    toast.success('Taxi type deleted successfully');
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTaxiType) return;
    
    // In a real app, this would call an API to save the taxi type
    if (taxiTypes.some(type => type.id === currentTaxiType.id)) {
      // Update existing
      setTaxiTypes(taxiTypes.map(type => 
        type.id === currentTaxiType.id ? currentTaxiType : type
      ));
      toast.success('Taxi type updated successfully');
    } else {
      // Add new
      setTaxiTypes([...taxiTypes, currentTaxiType]);
      toast.success('Taxi type added successfully');
    }
    
    setIsDialogOpen(false);
  };
  
  return (
    <DashboardLayout userType="admin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Taxi Types</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleAddEdit(null)} className="bg-booba-yellow text-booba-dark hover:bg-booba-yellow/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Taxi Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{currentTaxiType?.id ? 'Edit' : 'Add'} Taxi Type</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-1 block">Name</label>
                  <Input
                    id="name"
                    value={currentTaxiType?.name || ''}
                    onChange={(e) => setCurrentTaxiType(curr => curr ? {...curr, name: e.target.value} : null)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="emoji" className="text-sm font-medium mb-1 block">Emoji</label>
                  <Input
                    id="emoji"
                    value={currentTaxiType?.emoji || ''}
                    onChange={(e) => setCurrentTaxiType(curr => curr ? {...curr, emoji: e.target.value} : null)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="text-sm font-medium mb-1 block">Description</label>
                <Textarea
                  id="description"
                  value={currentTaxiType?.description || ''}
                  onChange={(e) => setCurrentTaxiType(curr => curr ? {...curr, description: e.target.value} : null)}
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="baseRate" className="text-sm font-medium mb-1 block">Base Rate ($)</label>
                  <Input
                    id="baseRate"
                    type="number"
                    step="0.01"
                    value={currentTaxiType?.baseRate || 0}
                    onChange={(e) => setCurrentTaxiType(curr => curr ? {...curr, baseRate: parseFloat(e.target.value)} : null)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="perKmRate" className="text-sm font-medium mb-1 block">Per KM Rate ($)</label>
                  <Input
                    id="perKmRate"
                    type="number"
                    step="0.01"
                    value={currentTaxiType?.perKmRate || 0}
                    onChange={(e) => setCurrentTaxiType(curr => curr ? {...curr, perKmRate: parseFloat(e.target.value)} : null)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="perMinuteRate" className="text-sm font-medium mb-1 block">Per Minute Rate ($)</label>
                  <Input
                    id="perMinuteRate"
                    type="number"
                    step="0.01"
                    value={currentTaxiType?.perMinuteRate || 0}
                    onChange={(e) => setCurrentTaxiType(curr => curr ? {...curr, perMinuteRate: parseFloat(e.target.value)} : null)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="capacity" className="text-sm font-medium mb-1 block">Capacity</label>
                  <Input
                    id="capacity"
                    type="number"
                    value={currentTaxiType?.capacity || 4}
                    onChange={(e) => setCurrentTaxiType(curr => curr ? {...curr, capacity: parseInt(e.target.value)} : null)}
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-booba-yellow text-booba-dark hover:bg-booba-yellow/90">
                  {currentTaxiType?.id ? 'Update' : 'Add'} Taxi Type
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taxiTypes.map((taxiType) => (
          <Card key={taxiType.id} className="overflow-hidden">
            <CardHeader className="bg-booba-yellow/10 pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{taxiType.emoji}</span>
                  <CardTitle>{taxiType.name}</CardTitle>
                </div>
                <div className="space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => handleAddEdit(taxiType)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(taxiType.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-4">{taxiType.description}</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>Base Rate:</div>
                <div className="font-medium">${taxiType.baseRate.toFixed(2)}</div>
                
                <div>Per KM Rate:</div>
                <div className="font-medium">${taxiType.perKmRate.toFixed(2)}</div>
                
                <div>Per Minute Rate:</div>
                <div className="font-medium">${taxiType.perMinuteRate.toFixed(2)}</div>
                
                <div>Capacity:</div>
                <div className="font-medium">{taxiType.capacity} persons</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AdminTaxiTypes;
