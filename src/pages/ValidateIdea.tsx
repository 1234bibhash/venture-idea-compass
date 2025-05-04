
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IdeaValidationForm from '@/components/IdeaValidationForm';

const ValidateIdea: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <IdeaValidationForm />
      </main>
      <Footer />
    </div>
  );
};

export default ValidateIdea;
