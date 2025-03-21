
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
        <div className="flex space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 1 ? 'bg-brand-500 text-white' : 'bg-brand-100 text-brand-500'}`}>1</div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 2 ? 'bg-brand-500 text-white' : 'bg-brand-100 text-brand-500'}`}>2</div>
        </div>
        <button 
          onClick={onCancel}
          className="text-neutral-500 hover:text-neutral-700 transition-colors"
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
