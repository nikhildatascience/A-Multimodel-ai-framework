
import React from 'react';
import type { Diagnosis } from '../types';

interface DiagnosisResultProps {
  result: Diagnosis | null;
  isLoading: boolean;
  error: string | null;
  hasRun: boolean;
}

const ResultSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 bg-slate-200 rounded w-3/4"></div>
    <div className="space-y-4">
      <div className="h-6 bg-slate-200 rounded w-1/2"></div>
      <div className="h-10 bg-slate-200 rounded w-full"></div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
    </div>
     <div className="space-y-2">
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
    </div>
  </div>
);

const InitialState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-semibold">Diagnosis results will appear here</h3>
        <p className="mt-1 max-w-sm">Complete the form and upload a medical image to begin the AI-powered diagnostic process.</p>
    </div>
);

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ result, isLoading, error, hasRun }) => {

  const ResultItem = ({ label, value, className = '' }: { label: string, value: React.ReactNode, className?: string }) => (
    <div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`text-lg font-semibold ${className}`}>{value}</p>
    </div>
  );

  const getPredictionClass = (prediction: 'Positive' | 'Negative') => {
    return prediction === 'Positive' ? 'text-red-600' : 'text-green-600';
  }

  if (isLoading) {
    return <ResultSkeleton />;
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-red-600 bg-red-50 p-6 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-bold">An Error Occurred</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!hasRun) {
    return <InitialState />;
  }

  if (!result) {
    return null; // Should not happen if not loading and no error, but good practice
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-b pb-3">Diagnosis Report</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
        <ResultItem label="Disease" value={result.diseaseName} />
        <ResultItem 
            label="Prediction" 
            value={result.prediction} 
            className={getPredictionClass(result.prediction)} 
        />
        <ResultItem 
            label="Confidence Score" 
            value={`${result.confidenceScore}%`} 
            className="text-blue-600"
        />
      </div>

      <div>
        <h3 className="font-semibold text-slate-700 mb-2">Reasoning</h3>
        <p className="text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">{result.briefReasoning}</p>
      </div>
      <div>
        <h3 className="font-semibold text-slate-700 mb-2">Recommendation</h3>
        <p className="text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">{result.recommendation}</p>
      </div>
    </div>
  );
};
