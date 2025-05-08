
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, CreditCard, MapPin, Check } from 'lucide-react';
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
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    pickup: '',
    dropoff: '',
    time: '12:00',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVC: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!bookingDetails.pickup || !bookingDetails.dropoff) {
        toast.error('Please enter both pickup and drop-off locations');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!bookingDetails.cardNumber || !bookingDetails.cardName || !bookingDetails.cardExpiry || !bookingDetails.cardCVC) {
        toast.error('Please fill in all payment details');
        return;
      }
      setStep(4);
      toast.success('Booking confirmed! Your chauffeur is on the way.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {step === 1 && (
        <>
          <div className="space-y-2">
            <label htmlFor="pickup" className="text-sm font-medium">Pickup Location</label>
            <div className="relative">
              <MapPin className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="pickup"
                name="pickup"
                value={bookingDetails.pickup}
                onChange={handleInputChange}
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
                name="dropoff"
                value={bookingDetails.dropoff}
                onChange={handleInputChange}
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
                name="time"
                value={bookingDetails.time}
                onChange={handleInputChange}
                className="w-32"
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full text-white font-medium bg-gradient-to-r from-fleet-red to-fleet-accent hover:opacity-90"
          >
            Next: Choose Transport
          </Button>
        </>
      )}
      
      {step === 2 && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium">Transport Type</label>
            <RadioGroup 
              value={selectedTaxiType} 
              onValueChange={setSelectedTaxiType}
              className="grid grid-cols-2 gap-3"
            >
              {taxiTypes.map((type) => (
                <div 
                  key={type.id} 
                  className={`border rounded-md p-3 hover:border-fleet-red cursor-pointer transition-colors ${selectedTaxiType === type.id ? 'border-fleet-red bg-fleet-red/10' : ''}`}
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
              Next: Payment
            </Button>
          </div>
        </>
      )}
      
      {step === 3 && (
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
                  value={bookingDetails.cardNumber}
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
                value={bookingDetails.cardName}
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
                  value={bookingDetails.cardExpiry}
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
                  value={bookingDetails.cardCVC}
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
              onClick={() => setStep(2)}
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
      
      {step === 4 && (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-green-600 mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600 mb-4">Your chauffeur is on the way.</p>
          <Card className="p-4 text-left mb-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Pickup:</span>
                <span className="font-medium">{bookingDetails.pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Dropoff:</span>
                <span className="font-medium">{bookingDetails.dropoff}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Date:</span>
                <span className="font-medium">{pickupDate ? format(pickupDate, "PPP") : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Time:</span>
                <span className="font-medium">{bookingDetails.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Transport:</span>
                <span className="font-medium">{taxiTypes.find(t => t.id === selectedTaxiType)?.name}</span>
              </div>
            </div>
          </Card>
          <Button 
            type="button"
            onClick={() => setStep(1)} 
            className="w-full text-white font-medium bg-gradient-to-r from-fleet-red to-fleet-accent hover:opacity-90"
          >
            Book Another Ride
          </Button>
        </div>
      )}
    </form>
  );
};

export default BookTaxiForm;
