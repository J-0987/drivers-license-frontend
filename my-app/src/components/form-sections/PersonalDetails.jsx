

import 'react-datepicker/dist/react-datepicker.css';

const PersonalDetails = ({ data, onInputChange, errors }) => {
  return (
    <div>
      {/* Last Name */}
      <div className="sm:col-span-2">
        <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
          Last name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="last-name"
            id="last-name"
            autoComplete="last-name"
            value={data.lastName}
            onChange={(e) => onInputChange('lastName', e.target.value)}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
              ${errors.lastName ? 'ring-red-500' : 'ring-gray-300'} 
              placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
          />
          {errors.lastName && (
            <span className="mt-2 text-sm text-red-600">{errors.lastName}</span>
          )}
        </div>
      </div>

      {/* First Name */}
      <div className="sm:col-span-2">
        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
          First name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="first-name"
            id="first-name"
            autoComplete="first-name"
            value={data.firstName}
            onChange={(e) => onInputChange('firstName', e.target.value)}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
              ${errors.firstName ? 'ring-red-500' : 'ring-gray-300'} 
              placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
          />
          {errors.firstName && (
            <span className="mt-2 text-sm text-red-600">{errors.firstName}</span>
          )}
        </div>
      </div>

           {/* Middle Name */}
           <div className="sm:col-span-2">
        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
          Midlle name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="middle-name"
            id="middle-name"
            autoComplete="middle-name"
            value={data.middleName}
            onChange={(e) => onInputChange('middleName', e.target.value)}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
              ${errors.middleNameName ? 'ring-red-500' : 'ring-gray-300'} 
              placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
          />
          {errors.middleName && (
            <span className="mt-2 text-sm text-red-600">{errors.middleName}</span>
          )}
        </div>
      </div>

       {/* ODL */}
       <div className="sm:col-span-2">
        <label htmlFor="license-number" className="block text-sm/6 font-medium text-gray-900">
        Ontario Driver's Licence Number / Numéro du permis de conduire de l'Ontario
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="license-number"
            id="license-number"
            autoComplete="license-number"
            value={data.licenseNumber}
            onChange={(e) => onInputChange('licenseNumber', e.target.value)}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
              ${errors.licenseNumber ? 'ring-red-500' : 'ring-gray-300'} 
              placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
          />
          {errors.licenseNumber && (
            <span className="mt-2 text-sm text-red-600">{errors.licenseNumber}</span>
          )}
        </div>
      </div>

      {/* Date of Birth */}
      <div className="sm:col-span-2">
        <label htmlFor="dob" className="block text-sm/6 font-medium text-gray-900">
          Date of Birth
        </label>
        <div className="mt-2">
        <input
    type="date"
    value={data.dateOfBirth || ''}
    onChange={(e) => onInputChange('dateOfBirth', e.target.value)}
    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
        ${errors.dateOfBirth ? 'ring-red-500' : 'ring-gray-300'} 
        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
/>
          {errors.dateOfBirth && (
            <span className="mt-2 text-sm text-red-600">{errors.dateOfBirth}</span>
          )}
        </div>
      </div>

      {/* Sex */}
      <div className="sm:col-span-2">
        <label htmlFor="sex" className="block text-sm/6 font-medium text-gray-900">
          Sex
        </label>
        <div className="mt-2">
          <select
            id="sex"
            name="sex"
            value={data.sex}
            onChange={(e) => onInputChange('sex', e.target.value)}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
              ${errors.sex ? 'ring-red-500' : 'ring-gray-300'} 
              placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.sex && (
            <span className="mt-2 text-sm text-red-600">{errors.sex}</span>
          )}
        </div>
      </div>

      {/* Height */}
      <div className="sm:col-span-2">
        <label htmlFor="height" className="block text-sm/6 font-medium text-gray-900">
          Height (cm)
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="height"
            id="height"
            value={data.height}
            onChange={(e) => onInputChange('height', e.target.value)}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
              ${errors.height ? 'ring-red-500' : 'ring-gray-300'} 
              placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
          />
          {errors.height && (
            <span className="mt-2 text-sm text-red-600">{errors.height}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;