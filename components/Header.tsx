
import React from 'react';

const DnaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.5A8.5 8.5 0 1 1 12 22a8.5 8.5 0 0 1-8-7.5"/>
        <path d="M20 9.5A8.5 8.5 0 1 0 12 2a8.5 8.5 0 0 0 8 7.5"/>
        <path d="M10 12h4"/>
        <path d="M7 17h4"/>
        <path d="M13 7h4"/>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <DnaIcon />
            <h1 className="text-xl font-bold text-slate-800">
              AI Medical Diagnostic Assistant
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
