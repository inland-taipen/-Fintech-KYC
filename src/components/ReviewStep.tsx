import { useFormContext } from 'react-hook-form';
import type { KYCFormData } from '../schemas/kycSchema';

export const ReviewStep = () => {
  const { watch } = useFormContext<KYCFormData>();
  const formData = watch();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Review Your Information</h2>
      <p className="text-gray-600">Please review all the information before submitting</p>

      <div className="bg-gray-50 rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Identity Information</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">First Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.identity?.firstName || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.identity?.lastName || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.identity?.email || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.identity?.username || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">PAN Card</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.identity?.panCard || '—'}</dd>
            </div>
          </dl>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Details</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Bank Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.bankDetails?.bankName || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Account Holder Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.bankDetails?.accountHolderName || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Account Number</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.bankDetails?.accountNumber || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">IFSC Code</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.bankDetails?.ifscCode || '—'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
