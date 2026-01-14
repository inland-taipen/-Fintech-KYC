import { useFormContext } from 'react-hook-form';
import type { KYCFormData } from '../schemas/kycSchema';

export const BankDetailsStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<KYCFormData>();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Bank Details</h2>
      <p className="text-gray-600">Please provide your banking information</p>

      <div>
        <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
          Bank Name <span className="text-red-500">*</span>
        </label>
        <input
          id="bankName"
          type="text"
          {...register('bankDetails.bankName')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter bank name"
        />
        {errors.bankDetails?.bankName && (
          <p className="mt-1 text-sm text-red-600">{errors.bankDetails.bankName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-1">
          Account Holder Name <span className="text-red-500">*</span>
        </label>
        <input
          id="accountHolderName"
          type="text"
          {...register('bankDetails.accountHolderName')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter account holder name"
        />
        {errors.bankDetails?.accountHolderName && (
          <p className="mt-1 text-sm text-red-600">{errors.bankDetails.accountHolderName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Account Number <span className="text-red-500">*</span>
        </label>
        <input
          id="accountNumber"
          type="text"
          {...register('bankDetails.accountNumber')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter account number"
        />
        {errors.bankDetails?.accountNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.bankDetails.accountNumber.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
          IFSC Code <span className="text-red-500">*</span>
        </label>
        <input
          id="ifscCode"
          type="text"
          {...register('bankDetails.ifscCode')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
          placeholder="AAAA0XXXXXX"
          maxLength={11}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();
            e.target.value = value;
            register('bankDetails.ifscCode').onChange(e);
          }}
        />
        <p className="mt-1 text-xs text-gray-500">Format: 4 letters, 0, 6 alphanumeric (e.g., HDFC0001234)</p>
        {errors.bankDetails?.ifscCode && (
          <p className="mt-1 text-sm text-red-600">{errors.bankDetails.ifscCode.message}</p>
        )}
      </div>
    </div>
  );
};
