import { describe, it, expect, beforeEach } from 'vitest';
import { saveFormData, loadFormData, clearFormData, saveCurrentStep, loadCurrentStep } from '../storage';
import type { KYCFormData } from '../../schemas/kycSchema';

describe('Storage Utilities', () => {
  beforeEach(() => {
    clearFormData();
  });

  describe('Form Data', () => {
    it('should save and load form data', () => {
      const data: Partial<KYCFormData> = {
        identity: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          panCard: 'ABCDE1234F',
          username: 'johndoe',
        },
      };

      saveFormData(data);
      const loaded = loadFormData();

      expect(loaded.identity?.firstName).toBe('John');
      expect(loaded.identity?.lastName).toBe('Doe');
      expect(loaded.identity?.email).toBe('john@example.com');
    });

    it('should merge form data when saving', () => {
      const identityData: Partial<KYCFormData> = {
        identity: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          panCard: 'ABCDE1234F',
          username: 'johndoe',
        },
      };

      saveFormData(identityData);

      const bankData: Partial<KYCFormData> = {
        bankDetails: {
          bankName: 'HDFC Bank',
          accountNumber: '1234567890',
          ifscCode: 'HDFC0001234',
          accountHolderName: 'John Doe',
        },
      };

      saveFormData(bankData);
      const loaded = loadFormData();

      expect(loaded.identity?.firstName).toBe('John');
      expect(loaded.bankDetails?.bankName).toBe('HDFC Bank');
    });

    it('should clear form data', () => {
      const data: Partial<KYCFormData> = {
        identity: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          panCard: 'ABCDE1234F',
          username: 'johndoe',
        },
      };

      saveFormData(data);
      clearFormData();
      const loaded = loadFormData();

      expect(loaded.identity).toBeUndefined();
    });
  });

  describe('Step Management', () => {
    it('should save and load current step', () => {
      saveCurrentStep(1);
      expect(loadCurrentStep()).toBe(1);

      saveCurrentStep(2);
      expect(loadCurrentStep()).toBe(2);
    });

    it('should return 0 for default step', () => {
      clearFormData();
      expect(loadCurrentStep()).toBe(0);
    });
  });
});
