
export type Disease = 
  | 'Brain Tumor Detection'
  | 'Bone Fracture Detection'
  | 'Eye Cancer Detection'
  | 'Skin Cancer Detection';

export interface PatientData {
  name: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  otherConditions: string;
}

export interface Diagnosis {
  diseaseName: Disease;
  prediction: 'Positive' | 'Negative';
  confidenceScore: number;
  briefReasoning: string;
  recommendation: string;
}
