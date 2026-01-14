import { z } from 'zod';

// Indian PAN Card format: 5 uppercase letters, 4 digits, 1 uppercase letter
export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export const identitySchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  panCard: z
    .string()
    .min(1, 'PAN Card is required')
    .transform((val) => val.toUpperCase())
    .refine((val) => PAN_REGEX.test(val), {
      message: 'PAN Card must be in format: AAAAA9999A (5 letters, 4 digits, 1 letter)',
    }),
  username: z.string().min(1, 'Username is required').min(3, 'Username must be at least 3 characters'),
});

export const bankDetailsSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().min(1, 'Account number is required').regex(/^\d+$/, 'Account number must contain only digits').min(9, 'Account number must be at least 9 digits'),
  ifscCode: z.string().min(1, 'IFSC Code is required').regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'IFSC Code must be in format: AAAA0XXXXXX'),
  accountHolderName: z.string().min(1, 'Account holder name is required'),
});

export const kycFormSchema = z.object({
  identity: identitySchema,
  bankDetails: bankDetailsSchema,
});

export type IdentityFormData = z.infer<typeof identitySchema>;
export type BankDetailsFormData = z.infer<typeof bankDetailsSchema>;
export type KYCFormData = z.infer<typeof kycFormSchema>;
