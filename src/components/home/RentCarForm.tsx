
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const RentCarForm = () => {
  const [pickupDate, setPickupDate] = React.useState<Date | undefined>(new Date());
  const [dropoffDate, setDropoffDate] = React.useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Car rental initiated! Redirecting to vehicle selection...");
    // In a real app, you would redirect to the vehicle selection page
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="pickup-location" className="text-sm font-medium">Pickup Location</label>
        <div className="relative">
          <MapPin className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="pickup-location"
            placeholder="Enter pickup location"
            className="pl-8"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="pickup-date" className="text-sm font-medium">Pickup Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="pickup-date"
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
        </div>
        
        <div className="space-y-2">
          <label htmlFor="dropoff-date" className="text-sm font-medium">Return Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="dropoff-date"
                variant={"outline"}
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dropoffDate ? format(dropoffDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dropoffDate}
                onSelect={setDropoffDate}
                initialFocus
                fromDate={pickupDate || new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full text-white font-medium bg-gradient-to-r from-fleet-red to-fleet-accent hover:opacity-90"
      >
        Find Cars
      </Button>
    </form>
  );
};

export default RentCarForm;
