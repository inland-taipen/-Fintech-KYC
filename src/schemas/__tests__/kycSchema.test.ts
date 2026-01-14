import { describe, it, expect } from 'vitest';
import { identitySchema, bankDetailsSchema, PAN_REGEX } from '../kycSchema';

describe('PAN Card Validation', () => {
  it('should validate correct PAN Card format', () => {
    const validPANs = [
      'ABCDE1234F',
      'XYZAB5678Z',
      'MNOPQ9876A',
    ];

    validPANs.forEach((pan) => {
      const result = identitySchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        panCard: pan,
        username: 'johndoe',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.panCard).toBe(pan);
      }
    });
  });

  it('should reject invalid PAN Card format', () => {
    const invalidPANs = [
      'ABCD1234F', // Too short (9 chars instead of 10)
      'ABCDE12345', // Ends with digit instead of letter
      'ABCDE1234', // Missing last letter
      '12345ABCDE', // Starts with digits
      'ABCDE1234FF', // Too long
      'ABCD-1234F', // Contains special character
    ];

    invalidPANs.forEach((pan) => {
      const result = identitySchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        panCard: pan,
        username: 'johndoe',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some((e) => e.path.includes('panCard'))).toBe(true);
      }
    });
  });

  it('should transform PAN Card to uppercase', () => {
    const result = identitySchema.safeParse({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      panCard: 'abcde1234f',
      username: 'johndoe',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.panCard).toBe('ABCDE1234F');
    }
  });

  it('should match PAN regex pattern correctly', () => {
    expect(PAN_REGEX.test('ABCDE1234F')).toBe(true);
    expect(PAN_REGEX.test('XYZAB5678Z')).toBe(true);
    expect(PAN_REGEX.test('ABCDE12345')).toBe(false);
    expect(PAN_REGEX.test('abcde1234f')).toBe(false);
    expect(PAN_REGEX.test('ABCD1234F')).toBe(false);
  });
});

describe('Identity Schema - Required Fields', () => {
  it('should require firstName', () => {
    const result = identitySchema.safeParse({
      lastName: 'Doe',
      email: 'john@example.com',
      panCard: 'ABCDE1234F',
      username: 'johndoe',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors.some((e) => e.path.includes('firstName'))).toBe(true);
    }
  });

  it('should require lastName', () => {
    const result = identitySchema.safeParse({
      firstName: 'John',
      email: 'john@example.com',
      panCard: 'ABCDE1234F',
      username: 'johndoe',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors.some((e) => e.path.includes('lastName'))).toBe(true);
    }
  });

  it('should require email', () => {
    const result = identitySchema.safeParse({
      firstName: 'John',
      lastName: 'Doe',
      panCard: 'ABCDE1234F',
      username: 'johndoe',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors.some((e) => e.path.includes('email'))).toBe(true);
    }
  });

  it('should require panCard', () => {
    const result = identitySchema.safeParse({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      username: 'johndoe',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors.some((e) => e.path.includes('panCard'))).toBe(true);
    }
  });

  it('should require username', () => {
    const result = identitySchema.safeParse({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      panCard: 'ABCDE1234F',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors.some((e) => e.path.includes('username'))).toBe(true);
    }
  });

  it('should validate all required fields when present', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      panCard: 'ABCDE1234F',
      username: 'johndoe',
    };
    const result = identitySchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.firstName).toBe('John');
      expect(result.data.lastName).toBe('Doe');
      expect(result.data.email).toBe('john.doe@example.com');
      expect(result.data.panCard).toBe('ABCDE1234F');
      expect(result.data.username).toBe('johndoe');
    }
  });
});

describe('Bank Details Schema - Required Fields', () => {
  it('should require bankName', () => {
    const result = bankDetailsSchema.safeParse({
      accountNumber: '1234567890',
      ifscCode: 'HDFC0001234',
      accountHolderName: 'John Doe',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors.some((e) => e.path.includes('bankName'))).toBe(true);
    }
  });

  it('should require accountNumber', () => {
    const result = bankDetailsSchema.safeParse({
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0001234',
      accountHolderName: 'John Doe',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors.some((e) => e.path.includes('accountNumber'))).toBe(true);
    }
  });

  it('should require ifscCode', () => {
    const result = bankDetailsSchema.safeParse({
      bankName: 'HDFC Bank',
      accountNumber: '1234567890',
      accountHolderName: 'John Doe',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors.some((e) => e.path.includes('ifscCode'))).toBe(true);
    }
  });

  it('should require accountHolderName', () => {
    const result = bankDetailsSchema.safeParse({
      bankName: 'HDFC Bank',
      accountNumber: '1234567890',
      ifscCode: 'HDFC0001234',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors.some((e) => e.path.includes('accountHolderName'))).toBe(true);
    }
  });
});
