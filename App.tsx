import React, { useState } from 'react';
import { Header } from './components/Header';
import { DiseaseSelection } from './components/DiseaseSelection';
import { DiagnosisView } from './components/DiagnosisView';
import type { Disease } from './types';

const App: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

  const handleBackToSelection = () => {
    setSelectedDisease(null);
    // Scroll to top for better UX on mobile
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <Header />
      {!selectedDisease ? (
        <DiseaseSelection onSelectDisease={setSelectedDisease} />
      ) : (
        <DiagnosisView
          disease={selectedDisease}
          onBack={handleBackToSelection}
        />
      )}
    </div>
  );
};

export default App;
