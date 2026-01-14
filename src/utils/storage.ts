import type { KYCFormData } from '../schemas/kycSchema';

const STORAGE_KEY = 'kyc-form-data';
const STORAGE_STEP_KEY = 'kyc-form-step';

export const saveFormData = (data: Partial<KYCFormData>): void => {
  try {
    const existingData = loadFormData();
    const mergedData = { ...existingData, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedData));
  } catch (error) {
    console.error('Failed to save form data:', error);
  }
};

export const loadFormData = (): Partial<KYCFormData> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to load form data:', error);
    return {};
  }
};

export const clearFormData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_STEP_KEY);
  } catch (error) {
    console.error('Failed to clear form data:', error);
  }
};

export const saveCurrentStep = (step: number): void => {
  try {
    localStorage.setItem(STORAGE_STEP_KEY, String(step));
  } catch (error) {
    console.error('Failed to save current step:', error);
  }
};

export const loadCurrentStep = (): number => {
  try {
    const step = localStorage.getItem(STORAGE_STEP_KEY);
    return step ? parseInt(step, 10) : 0;
  } catch (error) {
    console.error('Failed to load current step:', error);
    return 0;
  }
};
