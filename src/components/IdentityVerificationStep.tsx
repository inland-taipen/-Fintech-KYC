import { useFormContext } from 'react-hook-form';
import type { KYCFormData } from '../schemas/kycSchema';
import { useEffect, useState } from 'react';
import { checkUsernameAvailability } from '../utils/validation';

export const IdentityVerificationStep = () => {
  const {
    register,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useFormContext<KYCFormData>();
  
  const username = watch('identity.username');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  // Async username validation
  useEffect(() => {
    if (!username || username.length < 3) {
      return;
    }

    const timer = setTimeout(async () => {
      setIsCheckingUsername(true);
      const isAvailable = await checkUsernameAvailability(username);
      setIsCheckingUsername(false);

      if (!isAvailable) {
        setError('identity.username', {
          type: 'manual',
          message: 'This username is already taken',
        });
      } else {
        clearErrors('identity.username');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username, setError, clearErrors]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Identity Verification</h2>
      <p className="text-gray-600">Please provide your personal information</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            {...register('identity.firstName')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your first name"
          />
          {errors.identity?.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.identity.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            {...register('identity.lastName')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your last name"
          />
          {errors.identity?.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.identity.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('identity.email')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="your.email@example.com"
        />
        {errors.identity?.email && (
          <p className="mt-1 text-sm text-red-600">{errors.identity.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="username"
            type="text"
            {...register('identity.username')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Choose a username"
          />
          {isCheckingUsername && (
            <div className="absolute right-3 top-2.5">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        {errors.identity?.username && (
          <p className="mt-1 text-sm text-red-600">{errors.identity.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="panCard" className="block text-sm font-medium text-gray-700 mb-1">
          PAN Card <span className="text-red-500">*</span>
        </label>
        <input
          id="panCard"
          type="text"
          {...register('identity.panCard')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
          placeholder="AAAAA9999A"
          maxLength={10}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();
            e.target.value = value;
            register('identity.panCard').onChange(e);
          }}
        />
        <p className="mt-1 text-xs text-gray-500">Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)</p>
        {errors.identity?.panCard && (
          <p className="mt-1 text-sm text-red-600">{errors.identity.panCard.message}</p>
        )}
      </div>
    </div>
  );
};
