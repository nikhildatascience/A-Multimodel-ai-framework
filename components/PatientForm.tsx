import React from 'react';
import type { PatientData } from '../types';

interface PatientFormProps {
  patientData: PatientData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

// Fix: Explicitly typing the component with React.FC to resolve a TypeScript error where the 'children' prop was not being recognized.
interface FormFieldProps {
  children: React.ReactNode;
}
const FormField: React.FC<FormFieldProps> = ({ children }) => (
  <div className="flex flex-col gap-2">{children}</div>
);

// Fix: Explicitly typing the component with React.FC to resolve a TypeScript error where the 'children' prop was not being recognized.
interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}
const Label: React.FC<LabelProps> = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="font-medium text-slate-700">{children}</label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
   <select
      {...props}
      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
   >
     {props.children}
   </select>
);
  
const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    rows={3}
    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  />
);

export const PatientForm: React.FC<PatientFormProps> = ({
  patientData,
  onFormChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-b pb-3">Patient Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField>
          <Label htmlFor="name">Patient Name</Label>
          <Input id="name" name="name" type="text" value={patientData.name} onChange={onFormChange} placeholder="e.g., John Doe" />
        </FormField>
        <FormField>
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="number" value={patientData.age} onChange={onFormChange} placeholder="e.g., 45" />
        </FormField>
        <div className="md:col-span-2">
            <FormField>
            <Label htmlFor="gender">Gender</Label>
            <Select id="gender" name="gender" value={patientData.gender} onChange={onFormChange}>
                <option>Prefer not to say</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </Select>
            </FormField>
        </div>
        <div className="md:col-span-2">
            <FormField>
            <Label htmlFor="otherConditions">Other Medical Conditions</Label>
            <Textarea
                id="otherConditions"
                name="otherConditions"
                value={patientData.otherConditions}
                onChange={onFormChange}
                placeholder="e.g., Diabetes, Hypertension"
            />
            </FormField>
        </div>
      </div>
    </div>
  );
};
