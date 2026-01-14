import React, { useState, useEffect, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { kycFormSchema, type KYCFormData } from '../schemas/kycSchema';
import { IdentityVerificationStep } from './IdentityVerificationStep';
import { BankDetailsStep } from './BankDetailsStep';
import { ReviewStep } from './ReviewStep';
import { saveFormData, loadFormData, clearFormData, saveCurrentStep, loadCurrentStep } from '../utils/storage';

const STEPS = [
  { id: 0, name: 'Identity', component: IdentityVerificationStep },
  { id: 1, name: 'Bank Details', component: BankDetailsStep },
  { id: 2, name: 'Review', component: ReviewStep },
];

const getDefaultValues = (): KYCFormData => {
  const saved = loadFormData();
  return {
    identity: saved.identity || {
      firstName: '',
      lastName: '',
      email: '',
      panCard: '',
      username: '',
    },
    bankDetails: saved.bankDetails || {
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountHolderName: '',
    },
  };
};

export const KYCWizard = () => {
  const [currentStep, setCurrentStep] = useState(() => loadCurrentStep());
  const [isDirty, setIsDirty] = useState(false);

  const defaultValues = useMemo(() => getDefaultValues(), []);

  const methods = useForm<KYCFormData>({
    resolver: zodResolver(kycFormSchema),
    mode: 'onChange',
    defaultValues,
  });

  const { watch, handleSubmit, trigger } = methods;

  // Watch for form changes
  useEffect(() => {
    const subscription = watch(() => {
      setIsDirty(true);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Save form data to localStorage whenever form values change
  useEffect(() => {
    const subscription = watch((data) => {
      saveFormData(data as Partial<KYCFormData>);
      saveCurrentStep(currentStep);
    });
    return () => subscription.unsubscribe();
  }, [watch, currentStep]);

  // beforeunload warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleNext = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    const stepFields: (keyof KYCFormData)[] = ['identity', 'bankDetails'];
    const fieldToValidate = stepFields[currentStep];

    if (fieldToValidate) {
      const isValid = await trigger(`${fieldToValidate}`, { shouldFocus: true });
      if (!isValid) return;
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      saveCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      saveCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAndResume = () => {
    const data = methods.getValues();
    saveFormData(data);
    alert('Your progress has been saved! You can resume later.');
  };

  const onSubmit = async (data: KYCFormData) => {
    console.log('Form submitted:', data);
    clearFormData();
    setIsDirty(false);
    alert('KYC form submitted successfully!');
    // Reset form
    methods.reset();
    setCurrentStep(0);
  };

  const CurrentStepComponent = STEPS[currentStep].component;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      index === currentStep
                        ? 'bg-blue-600 text-white'
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index < currentStep ? '✓' : step.id + 1}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      index === currentStep ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <CurrentStepComponent />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <div>
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Back
              </button>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleSaveAndResume}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save & Resume Later
            </button>

            {currentStep < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNext(e);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
