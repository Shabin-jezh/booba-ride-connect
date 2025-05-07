
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { contact, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Your message has been sent! We'll respond shortly.");
    // In a real app, this would send the form data to a backend
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-fleet-red to-fleet-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center">
            <contact className="mr-2 h-8 w-8" />
            Contact Us
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            We're here to help! Reach out with any questions, feedback, or concerns.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-fleet-dark mb-6">Get in Touch</h2>
            <p className="text-gray-700 mb-8">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>

            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="What is your message about?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                    rows={5}
                    required
                    className="resize-none"
                  />
                </div>

                <Button type="submit" className="bg-fleet-red text-white hover:bg-fleet-red/90">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-fleet-dark mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md flex">
                <Phone className="h-6 w-6 text-fleet-red mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-fleet-dark">Phone</h3>
                  <p className="text-gray-700">(123) 456-7890</p>
                  <p className="text-gray-700">(987) 654-3210</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex">
                <Mail className="h-6 w-6 text-fleet-red mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-fleet-dark">Email</h3>
                  <p className="text-gray-700">info@firstclassfleet.com</p>
                  <p className="text-gray-700">support@firstclassfleet.com</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex">
                <MapPin className="h-6 w-6 text-fleet-red mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-fleet-dark">Address</h3>
                  <p className="text-gray-700">
                    123 Transport Street,<br />
                    City, Country
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex">
                <Clock className="h-6 w-6 text-fleet-red mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-fleet-dark">Business Hours</h3>
                  <p className="text-gray-700">
                    Monday - Friday: 9AM - 6PM<br />
                    Saturday: 10AM - 4PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <h3 className="font-bold text-fleet-dark p-4 border-b">Our Location</h3>
              <div className="aspect-video bg-gray-200">
                {/* In a real app, this would be a Google Maps embed */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">Map would be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
