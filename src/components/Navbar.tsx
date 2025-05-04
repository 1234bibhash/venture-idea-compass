
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { BulbIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-gray-200 py-4 px-6 bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <BulbIcon className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">VentureCompass</span>
        </Link>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-primary">How It Works</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-primary">Pricing</Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link to="/validate-idea">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
