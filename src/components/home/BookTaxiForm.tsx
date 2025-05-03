
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const taxiTypes = [
  { id: 'economy', name: 'Economy', description: 'Affordable rides for everyday use', price: '1x', emoji: '🚗' },
  { id: 'comfort', name: 'Comfort', description: 'More space and comfort', price: '1.5x', emoji: '🚕' },
  { id: 'suv', name: 'SUV', description: 'Spacious vehicles for groups', price: '2x', emoji: '🚙' },
  { id: 'premium', name: 'Premium', description: 'Luxury vehicles for special occasions', price: '3x', emoji: '🏎️' }
];

const BookTaxiForm = () => {
  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [selectedTaxiType, setSelectedTaxiType] = useState('economy');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Find the selected taxi type
    const taxiType = taxiTypes.find(type => type.id === selectedTaxiType);
    
    toast.success(`Taxi booking initiated for ${taxiType?.name}! Redirecting to booking page...`);
    // In a real app, you would redirect to the booking page or proceed with the booking
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="pickup" className="text-sm font-medium">Pickup Location</label>
        <div className="relative">
          <MapPin className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="pickup"
            placeholder="Enter pickup address"
            className="pl-8"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="dropoff" className="text-sm font-medium">Dropoff Location</label>
        <div className="relative">
          <MapPin className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="dropoff"
            placeholder="Enter destination address"
            className="pl-8"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium">Date & Time</label>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {pickupDate ? format(pickupDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={setPickupDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Input
            type="time"
            defaultValue="12:00"
            className="w-32"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Taxi Type</label>
        <RadioGroup 
          value={selectedTaxiType} 
          onValueChange={setSelectedTaxiType}
          className="grid grid-cols-2 gap-3"
        >
          {taxiTypes.map((type) => (
            <div 
              key={type.id} 
              className={`border rounded-md p-3 hover:border-booba-yellow cursor-pointer transition-colors ${selectedTaxiType === type.id ? 'border-booba-yellow bg-booba-yellow/10' : ''}`}
              onClick={() => setSelectedTaxiType(type.id)}
            >
              <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
              <div className="flex items-start gap-2">
                <span className="text-xl">{type.emoji}</span>
                <div>
                  <h4 className="text-sm font-medium">{type.name}</h4>
                  <p className="text-xs text-gray-500">{type.description}</p>
                  <p className="text-xs font-bold mt-1">{type.price} fare</p>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-booba-yellow text-booba-dark hover:bg-booba-yellow/90"
      >
        Find Taxi
      </Button>
    </form>
  );
};

export default BookTaxiForm;
