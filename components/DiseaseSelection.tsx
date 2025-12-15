import React from 'react';
import type { Disease } from '../types';
import { DISEASES } from '../constants';
import { BrainIcon, BoneIcon, EyeIcon, SkinIcon } from './icons';

interface DiseaseSelectionProps {
  onSelectDisease: (disease: Disease) => void;
}

const diseaseInfo: Record<Disease, { Icon: React.FC; description: string; }> = {
  'Brain Tumor Detection': {
    Icon: BrainIcon,
    description: 'Analyze MRI scans to identify potential brain tumors with high accuracy.',
  },
  'Bone Fracture Detection': {
    Icon: BoneIcon,
    description: 'Detect fractures in X-ray images, assisting in rapid and precise diagnosis.',
  },
  'Eye Cancer Detection': {
    Icon: EyeIcon,
    description: 'Identify early signs of ocular melanoma from retinal fundus images.',
  },
  'Skin Cancer Detection': {
    Icon: SkinIcon,
    description: 'Evaluate dermatoscopic images for signs of melanoma and other skin cancers.',
  },
};

const DiseaseCard: React.FC<{ disease: Disease; onSelect: () => void; }> = ({ disease, onSelect }) => {
    const { Icon, description } = diseaseInfo[disease];
    return (
        <button
            onClick={onSelect}
            className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-left flex flex-col items-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full"
            aria-label={`Start diagnosis for ${disease}`}
        >
            <Icon />
            <h3 className="text-lg font-bold text-slate-800 mb-2">{disease}</h3>
            <p className="text-sm text-slate-600 flex-grow mb-4">{description}</p>
            <span className="mt-auto text-sm font-semibold text-blue-600 group-hover:underline">
                Start Diagnosis &rarr;
            </span>
        </button>
    );
}

export const DiseaseSelection: React.FC<DiseaseSelectionProps> = ({ onSelectDisease }) => {
  return (
    <main className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">AI-Powered Diagnostic Tools</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                Select a specialized tool to begin your analysis. Our advanced AI models provide fast, accurate insights from medical imagery to support clinical decision-making.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DISEASES.map(disease => (
                <DiseaseCard 
                    key={disease} 
                    disease={disease} 
                    onSelect={() => onSelectDisease(disease)} 
                />
            ))}
        </div>
    </main>
  );
};
