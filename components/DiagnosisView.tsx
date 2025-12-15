import React, { useState, useCallback } from 'react';
import { PatientForm } from './PatientForm';
import { DiagnosisResult } from './DiagnosisResult';
import { ImageUploader } from './ImageUploader';
import { getDiagnosis } from '../services/geminiService';
import type { PatientData, Diagnosis, Disease } from '../types';

interface DiagnosisViewProps {
  disease: Disease;
  onBack: () => void;
}

export const DiagnosisView: React.FC<DiagnosisViewProps> = ({ disease, onBack }) => {
  const [patientData, setPatientData] = useState<PatientData>({
    name: '',
    age: '',
    gender: 'Prefer not to say',
    otherConditions: '',
  });
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);

  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatientData(prev => ({ ...prev, [name]: value }));
  };

  const handleDiagnose = useCallback(async () => {
    if (!imageBase64 || !imageMimeType || !disease) {
      setError("Please upload an image and select a disease to diagnose.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setDiagnosis(null);

    try {
      const result = await getDiagnosis(patientData, disease, imageBase64, imageMimeType);
      setDiagnosis(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during diagnosis.");
    } finally {
      setIsLoading(false);
    }
  }, [patientData, disease, imageBase64, imageMimeType]);
  
  const handleReset = () => {
    setPatientData({ name: '', age: '', gender: 'Prefer not to say', otherConditions: '' });
    setImageBase64(null);
    setImageMimeType(null);
    setDiagnosis(null);
    setError(null);
    setIsLoading(false);
  }

  const isDiagnoseDisabled = !imageBase64 || !disease || isLoading;

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <button 
          onClick={onBack} 
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center group"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Tools
        </button>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">{disease}</h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Please fill in the patient details and upload the relevant medical image to proceed.
        </p>
      </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-8">
            <PatientForm
              patientData={patientData}
              onFormChange={handleFormChange}
            />
            <ImageUploader 
              key={imageBase64} // Reset component on new image
              onImageUpload={(base64, mimeType) => {
                setImageBase64(base64);
                setImageMimeType(mimeType);
              }}
            />
            <button
              onClick={handleDiagnose}
              disabled={isDiagnoseDisabled}
              className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center
                ${isDiagnoseDisabled 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Diagnosing...
                </>
              ) : 'Run Diagnosis'}
            </button>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[400px]">
            <DiagnosisResult 
              result={diagnosis}
              isLoading={isLoading}
              error={error}
              hasRun={diagnosis !== null || isLoading || error !== null}
            />
          </div>
        </div>
    </main>
  );
};