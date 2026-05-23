
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormData } from '../types';
import CategorySelector from './CategorySelector';
import LocationSelector from './LocationSelector';
import { ArrowRight, ArrowLeft, Search } from 'lucide-react';

interface OnboardingFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    category: '',
    customCategory: '',
    location: '',
    customLocation: '',
  });

  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category });
  };

  const handleCustomCategoryChange = (value: string) => {
    setFormData({ ...formData, customCategory: value });
  };

  const handleLocationSelect = (location: string) => {
    setFormData({ ...formData, location });
  };

  const handleCustomLocationChange = (value: string) => {
    setFormData({ ...formData, customLocation: value });
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.category) {
        // Show some error
        return;
      }
      setStep(2);
    } else if (step === 2) {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onCancel();
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isStepValid = () => {
    if (step === 1) {
      return !!formData.category && (formData.category !== 'other' || !!formData.customCategory);
    }
    if (step === 2) {
      return !!formData.location || !!formData.customLocation;
    }
    return false;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-glass p-6 sm:p-10 transition-all animate-scale-up">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          {[
            { n: 1, label: 'Category' },
            { n: 2, label: 'Market' },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                    step >= s.n
                      ? 'bg-brand-500 text-white shadow-glow'
                      : 'bg-brand-50 text-brand-400 ring-1 ring-brand-100'
                  } ${step === s.n ? 'scale-110' : ''}`}
                >
                  {step > s.n ? (
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.3 3.29 6.8-6.8a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    s.n
                  )}
                </div>
                <span
                  className={`hidden text-sm font-medium sm:inline ${
                    step >= s.n ? 'text-neutral-800' : 'text-neutral-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i === 0 && (
                <div className="mx-3 h-[2px] w-10 overflow-hidden rounded-full bg-brand-100 sm:w-16">
                  <div
                    className={`h-full rounded-full bg-brand-500 transition-all duration-500 ${
                      step > 1 ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={onCancel}
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-700"
        >
          Cancel
        </button>
      </div>

      <div className="min-h-[400px]">
        {step === 1 && (
          <CategorySelector
            selectedCategory={formData.category}
            customCategory={formData.customCategory}
            onSelectCategory={handleCategorySelect}
            onCustomCategoryChange={handleCustomCategoryChange}
          />
        )}

        {step === 2 && (
          <LocationSelector
            selectedLocation={formData.location}
            customLocation={formData.customLocation}
            onSelectLocation={handleLocationSelect}
            onCustomLocationChange={handleCustomLocationChange}
          />
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <Button 
          onClick={handlePrevStep} 
          variant="outline"
          className="gap-2"
        >
          <ArrowLeft size={16} />
          {step === 1 ? 'Cancel' : 'Back'}
        </Button>
        
        <Button 
          onClick={handleNextStep} 
          disabled={!isStepValid()}
          className="gap-2 bg-brand-500 hover:bg-brand-600"
        >
          {step === 2 ? (
            <>
              <Search size={16} />
              Find Competitors
            </>
          ) : (
            <>
              Next
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingForm;
