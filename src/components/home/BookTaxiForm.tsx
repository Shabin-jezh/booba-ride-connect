import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, CreditCard, MapPin, Check, FileText, Book } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const taxiTypes = [
  { id: 'economy', name: 'Economy', description: 'Affordable rides for everyday use', price: '1x', emoji: '🚗' },
  { id: 'comfort', name: 'Comfort', description: 'More space and comfort', price: '1.5x', emoji: '🚕' },
  { id: 'suv', name: 'SUV', description: 'Spacious vehicles for groups', price: '2x', emoji: '🚙' },
  { id: 'premium', name: 'Premium', description: 'Luxury vehicles for special occasions', price: '3x', emoji: '🏎️' }
];

const carModels = {
  economy: [
    { id: 'toyota-corolla', name: 'Toyota Corolla', image: '🚗', description: 'Fuel efficient and reliable' },
    { id: 'honda-civic', name: 'Honda Civic', image: '🚗', description: 'Compact and comfortable' }
  ],
  comfort: [
    { id: 'toyota-camry', name: 'Toyota Camry', image: '🚕', description: 'Smooth ride with extra legroom' },
    { id: 'honda-accord', name: 'Honda Accord', image: '🚕', description: 'Balanced comfort and style' }
  ],
  suv: [
    { id: 'toyota-rav4', name: 'Toyota RAV4', image: '🚙', description: 'Spacious with great cargo capacity' },
    { id: 'ford-explorer', name: 'Ford Explorer', image: '🚙', description: 'Powerful and versatile' }
  ],
  premium: [
    { id: 'mercedes-e', name: 'Mercedes E-Class', image: '🏎️', description: 'Luxury sedan with premium features' },
    { id: 'rolls-royce', name: 'Rolls Royce', image: '🏎️', description: 'Ultimate luxury experience' }
  ]
};

const bookingStatuses = [
  { id: 'initiated', label: 'Booking Initiated', completed: true },
  { id: 'awaiting', label: 'Awaiting Confirmation', completed: false },
  { id: 'assigned', label: 'Driver Assigned', completed: false },
  { id: 'pickup', label: 'Pickup Done', completed: false },
  { id: 'dropped', label: 'Dropped at Location', completed: false }
];

const BookTaxiForm = () => {
  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [selectedTaxiType, setSelectedTaxiType] = useState('economy');
  const [selectedCarModel, setSelectedCarModel] = useState('');
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
      if (!selectedTaxiType) {
        toast.error('Please select a transport type');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!selectedCarModel) {
        toast.error('Please select a car model');
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!bookingDetails.cardNumber || !bookingDetails.cardName || !bookingDetails.cardExpiry || !bookingDetails.cardCVC) {
        toast.error('Please fill in all payment details');
        return;
      }
      setStep(5);
      toast.success('Booking initiated! Your request is being processed.');
    }
  };
  
  // Function to handle receipt download
  const handleDownloadReceipt = () => {
    toast.success('Receipt downloaded successfully');
    // In a real app, this would generate and download a PDF receipt
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
            Book Chauffeur
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
              Next: Choose Car
            </Button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium">Available Cars</label>
            <RadioGroup 
              value={selectedCarModel} 
              onValueChange={setSelectedCarModel}
              className="space-y-3"
            >
              {carModels[selectedTaxiType as keyof typeof carModels].map((car) => (
                <div 
                  key={car.id} 
                  className={`border rounded-md p-3 hover:border-fleet-red cursor-pointer transition-colors ${selectedCarModel === car.id ? 'border-fleet-red bg-fleet-red/10' : ''}`}
                  onClick={() => setSelectedCarModel(car.id)}
                >
                  <RadioGroupItem value={car.id} id={car.id} className="sr-only" />
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{car.image}</span>
                    <div>
                      <h4 className="font-medium">{car.name}</h4>
                      <p className="text-sm text-gray-500">{car.description}</p>
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
              onClick={() => setStep(2)}
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
      
      {step === 4 && (
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
              onClick={() => setStep(3)}
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
      
      {step === 5 && (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-green-600 mb-2">Booking Initiated!</h3>
          <p className="text-gray-600 mb-4">Your request is being processed.</p>
          
          <div className="mb-6">
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
              {bookingStatuses.map((status, index) => (
                <li key={status.id} className="mb-6 ml-4">
                  <div className={`absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border ${index === 0 ? 'bg-green-500 border-green-500' : 'bg-gray-200 border-gray-200'}`}></div>
                  <p className={`text-sm font-semibold ${index === 0 ? 'text-green-600' : 'text-gray-500'}`}>{status.label}</p>
                </li>
              ))}
            </ol>
          </div>
          
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
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Vehicle:</span>
                <span className="font-medium">
                  {carModels[selectedTaxiType as keyof typeof carModels].find(c => c.id === selectedCarModel)?.name}
                </span>
              </div>
            </div>
          </Card>
      
          <div className="flex flex-col space-y-3">
            <Button 
              variant="outline"
              onClick={handleDownloadReceipt}
              className="w-full flex items-center justify-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              Download Payment Receipt
            </Button>
            
            <Link to="/my-bookings" className="w-full">
              <Button 
                className="w-full text-white font-medium bg-gradient-to-r from-fleet-red to-fleet-accent hover:opacity-90 flex items-center justify-center"
              >
                <Book className="mr-2 h-4 w-4" />
                View My Bookings
              </Button>
            </Link>
            
            <Button 
              type="button"
              variant="outline"
              onClick={() => setStep(1)} 
              className="w-full"
            >
              Book Another Ride
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default BookTaxiForm;
