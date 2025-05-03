
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const BookTaxiForm = () => {
  const [pickupDate, setPickupDate] = React.useState<Date | undefined>(new Date());
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Taxi booking initiated! Redirecting to booking page...");
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
