
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, CreditCard, Check } from 'lucide-react';
import { toast } from 'sonner';

const RentCarForm = () => {
  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVC: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.pickupLocation) {
        toast.error('Please enter pickup location');
        return;
      }
      if (!pickupDate || !dropoffDate) {
        toast.error('Please select both pickup and return dates');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCVC) {
        toast.error('Please fill in all payment details');
        return;
      }
      setStep(3);
      toast.success('Car rental confirmed! Your vehicle will be ready for pickup.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {step === 1 && (
        <>
          <div className="space-y-2">
            <label htmlFor="pickup-location" className="text-sm font-medium">Pickup Location</label>
            <div className="relative">
              <MapPin className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="pickup-location"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
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
            Next: Payment
          </Button>
        </>
      )}
      
      {step === 2 && (
        <>
          <div className="space-y-4">
            <h3 className="font-medium">Payment Details</h3>
            <div>
              <label htmlFor="cardNumber" className="text-sm font-medium">Card Number</label>
              <div className="relative">
                <CreditCard className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="pl-8"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="cardName" className="text-sm font-medium">Cardholder Name</label>
              <Input
                id="cardName"
                name="cardName"
                placeholder="John Smith"
                value={formData.cardName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cardExpiry" className="text-sm font-medium">Expiry Date</label>
                <Input
                  id="cardExpiry"
                  name="cardExpiry"
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="cardCVC" className="text-sm font-medium">CVC</label>
                <Input
                  id="cardCVC"
                  name="cardCVC"
                  placeholder="123"
                  value={formData.cardCVC}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="button"
              variant="outline" 
              className="flex-1"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="flex-1 text-white font-medium bg-gradient-to-r from-fleet-red to-fleet-accent hover:opacity-90"
            >
              Confirm Payment
            </Button>
          </div>
        </>
      )}
      
      {step === 3 && (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-green-600 mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600 mb-4">Your rental car will be ready for pickup.</p>
          <Card className="p-4 text-left mb-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Pickup Location:</span>
                <span className="font-medium">{formData.pickupLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Pickup Date:</span>
                <span className="font-medium">{pickupDate ? format(pickupDate, "PPP") : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Return Date:</span>
                <span className="font-medium">{dropoffDate ? format(dropoffDate, "PPP") : ''}</span>
              </div>
            </div>
          </Card>
          <Button 
            type="button"
            onClick={() => setStep(1)} 
            className="w-full text-white font-medium bg-gradient-to-r from-fleet-red to-fleet-accent hover:opacity-90"
          >
            Book Another Car
          </Button>
        </div>
      )}
    </form>
  );
};

export default RentCarForm;
