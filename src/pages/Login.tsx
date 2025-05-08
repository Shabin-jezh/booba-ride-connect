
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Login = () => {
  const [userType, setUserType] = useState('customer');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmitPhone = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("OTP sent to your mobile number!");
    setIsDialogOpen(true);
    // In a real app, this would send OTP to the provided phone number
  };
  
  const handleVerifyOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Login successful!");
    setIsDialogOpen(false);
    
    // Navigate based on user type
    switch (userType) {
      case 'admin':
        navigate('/admin');
        break;
      case 'driver':
        navigate('/driver');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Log in</CardTitle>
              <CardDescription>
                Enter your mobile number to receive a login code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitPhone} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone number</label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+971 50 123 4567"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">I am a:</label>
                  <RadioGroup 
                    value={userType} 
                    onValueChange={setUserType}
                    className="flex space-x-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="customer" id="customer" />
                      <Label htmlFor="customer">Customer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="driver" id="driver" />
                      <Label htmlFor="driver">Driver</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="admin" />
                      <Label htmlFor="admin">Admin</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button type="submit" className="w-full bg-fleet-red text-white hover:bg-fleet-red/90">
                  Send login code
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-fleet-red hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter verification code</DialogTitle>
            <DialogDescription>
              We've sent a 6-digit code to your mobile number. Please enter it below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="flex justify-center my-4">
              <InputOTP maxLength={6} className="gap-2">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="text-center text-sm">
              Didn't receive a code? <button type="button" className="text-fleet-red hover:underline">Resend code</button>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Verify & Log in</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Login;
