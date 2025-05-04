
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IdeaResults from '@/components/IdeaResults';

const Results: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <IdeaResults />
      </main>
      <Footer />
    </div>
  );
};

export default Results;
