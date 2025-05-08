
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTaxiTypes from "./pages/AdminTaxiTypes";
import AdminFareSettings from "./pages/AdminFareSettings";
import AdminGeofencing from "./pages/AdminGeofencing";
import AdminRentalVehicles from "./pages/AdminRentalVehicles";
import AdminPaymentSettings from "./pages/AdminPaymentSettings";
import AdminUsers from "./pages/AdminUsers";
import AdminDrivers from "./pages/AdminDrivers";
import AdminBookings from "./pages/AdminBookings";
import AdminSettings from "./pages/AdminSettings";
import DriverDashboard from "./pages/DriverDashboard";
import DriverBankDetails from "./pages/DriverBankDetails";
import DriverProfile from "./pages/DriverProfile";
import DriverRides from "./pages/DriverRides";
import DriverEarnings from "./pages/DriverEarnings";
import DriverSettings from "./pages/DriverSettings";
import MyAccount from "./pages/MyAccount";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/drivers" element={<AdminDrivers />} />
          <Route path="/admin/taxi-types" element={<AdminTaxiTypes />} />
          <Route path="/admin/vehicles" element={<AdminRentalVehicles />} />
          <Route path="/admin/fare-settings" element={<AdminFareSettings />} />
          <Route path="/admin/geofencing" element={<AdminGeofencing />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/payment-settings" element={<AdminPaymentSettings />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/driver/profile" element={<DriverProfile />} />
          <Route path="/driver/rides" element={<DriverRides />} />
          <Route path="/driver/earnings" element={<DriverEarnings />} />
          <Route path="/driver/bank-details" element={<DriverBankDetails />} />
          <Route path="/driver/settings" element={<DriverSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
