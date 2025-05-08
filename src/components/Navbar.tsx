
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import BookTaxiForm from './home/BookTaxiForm';
import RentCarForm from './home/RentCarForm';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Logo />
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <AuthButtons />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in bg-white/95 backdrop-blur-sm rounded-b-lg">
            <div className="flex flex-col space-y-4">
              <NavLinks mobile />
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <AuthButtons mobile />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const baseClass = mobile 
    ? "px-2 py-1 text-fleet-dark hover:text-fleet-red transition-colors" 
    : "text-fleet-dark hover:text-fleet-red transition-colors";
  
  return (
    <>
      <Link to="/" className={baseClass}>Home</Link>
      <Dialog>
        <DialogTrigger asChild>
          <button className={baseClass}>Book Chauffeur</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4">Book a Chauffeur</h3>
            <BookTaxiForm />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <button className={baseClass}>Hourly</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4">Hourly Rental</h3>
            <RentCarForm />
          </div>
        </DialogContent>
      </Dialog>
      <Link to="/about" className={baseClass}>About</Link>
      <Link to="/contact" className={baseClass}>Contact</Link>
      <Link to="/faq" className={baseClass}>FAQ</Link>
    </>
  );
};

const AuthButtons = ({ mobile = false }: { mobile?: boolean }) => {
  if (mobile) {
    return (
      <>
        <Link to="/login" className="w-full">
          <Button variant="outline" className="w-full">Login</Button>
        </Link>
        <Link to="/register" className="w-full">
          <Button className="w-full bg-fleet-red text-white hover:bg-fleet-red/90">Register</Button>
        </Link>
      </>
    );
  }
  
  return (
    <>
      <Link to="/login">
        <Button variant="outline">Login</Button>
      </Link>
      <Link to="/register">
        <Button className="bg-fleet-red text-white hover:bg-fleet-red/90">Register</Button>
      </Link>
    </>
  );
};

export default Navbar;
