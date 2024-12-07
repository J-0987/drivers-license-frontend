

import 'react-datepicker/dist/react-datepicker.css';
const PersonalDetails = ({ data, onInputChange, errors, disabled }) => {
  if (disabled) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Personal Details</h2>
        <div className="grid gap-4">
          <div className="field-display border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-700">Last Name:</span>
            <span className="text-gray-900">{data.lastName}</span>
          </div>
          <div className="field-display border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-700">First Name:</span>
            <span className="text-gray-900">{data.firstName}</span>
          </div>
          <div className="field-display border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-700">Middle Name:</span>
            <span className="text-gray-900">{data.middleName || 'N/A'}</span>
          </div>
          <div className="field-display border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-700">License Number:</span>
            <span className="text-gray-900">{data.licenseNumber}</span>
          </div>
          <div className="field-display border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-700">Date of Birth:</span>
            <span className="text-gray-900">{data.dateOfBirth}</span>
          </div>
          <div className="field-display border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-700">Sex:</span>
            <span className="text-gray-900">{data.sex}</span>
          </div>
          <div className="field-display border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-700">Height (cm):</span>
            <span className="text-gray-900">{data.height}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
            Last name
          </label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            value={data.lastName}
            onChange={(e) => onInputChange('lastName', e.target.value)}
            className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.lastName ? 'ring-red-500' : 'ring-gray-300'
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          />
          {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
            First name
          </label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            value={data.firstName}
            onChange={(e) => onInputChange('firstName', e.target.value)}
            className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.firstName ? 'ring-red-500' : 'ring-gray-300'
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          />
          {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="middle-name" className="block text-sm font-medium text-gray-900">
            Middle name
          </label>
          <input
            type="text"
            name="middle-name"
            id="middle-name"
            value={data.middleName}
            onChange={(e) => onInputChange('middleName', e.target.value)}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label htmlFor="license-number" className="block text-sm font-medium text-gray-900">
            Ontario Driver's License Number
          </label>
          <input
            type="text"
            name="license-number"
            id="license-number"
            value={data.licenseNumber}
            onChange={(e) => onInputChange('licenseNumber', e.target.value)}
            className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.licenseNumber ? 'ring-red-500' : 'ring-gray-300'
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          />
          {errors.licenseNumber && <p className="mt-2 text-sm text-red-600">{errors.licenseNumber}</p>}
        </div>

        <div>
          <label htmlFor="date-of-birth" className="block text-sm font-medium text-gray-900">
            Date of Birth
          </label>
          <input
            type="date"
            name="date-of-birth"
            id="date-of-birth"
            value={data.dateOfBirth}
            onChange={(e) => onInputChange('dateOfBirth', e.target.value)}
            className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.dateOfBirth ? 'ring-red-500' : 'ring-gray-300'
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          />
          {errors.dateOfBirth && <p className="mt-2 text-sm text-red-600">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <label htmlFor="sex" className="block text-sm font-medium text-gray-900">
            Sex
          </label>
          <select
            id="sex"
            name="sex"
            value={data.sex}
            onChange={(e) => onInputChange('sex', e.target.value)}
            className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.sex ? 'ring-red-500' : 'ring-gray-300'
            } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.sex && <p className="mt-2 text-sm text-red-600">{errors.sex}</p>}
        </div>

        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-900">
            Height (cm)
          </label>
          <input
            type="number"
            name="height"
            id="height"
            value={data.height}
            onChange={(e) => onInputChange('height', e.target.value)}
            className={`mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.height ? 'ring-red-500' : 'ring-gray-300'
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          />
          {errors.height && <p className="mt-2 text-sm text-red-600">{errors.height}</p>}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;

